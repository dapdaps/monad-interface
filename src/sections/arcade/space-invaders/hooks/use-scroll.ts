import { useEffect, useRef, useState, useCallback } from "react";
import { useDebounceFn } from "ahooks";

export type ScrollDirection = "up" | "down" | null;

interface UseScrollDirectionOptions {
  debounceWait?: number;
  threshold?: number;
  enabled?: boolean;
  preventBounce?: boolean;
}

export const useScrollDirection = (
  containerRef: React.RefObject<HTMLElement>,
  options: UseScrollDirectionOptions = {}
) => {
  const { debounceWait = 100, threshold = 5, enabled = true, preventBounce = true } = options;
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const lastScrollTop = useRef(0);
  const isAtTop = useRef(false);
  const isAtBottom = useRef(false);
  const lastValidScrollTop = useRef(0);

  const { run: debouncedSetDirection } = useDebounceFn(
    (direction: ScrollDirection) => {
      setScrollDirection(direction);
    },
    { wait: debounceWait }
  );

  const handleScroll = useCallback(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const currentScrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    const atTop = currentScrollTop <= 0;
    const atBottom = currentScrollTop + clientHeight >= scrollHeight - 1;

    isAtTop.current = atTop;
    isAtBottom.current = atBottom;

    const scrollDifference = Math.abs(currentScrollTop - lastScrollTop.current);

    if (scrollDifference > threshold) {
      let direction: ScrollDirection = null;
      
      if (preventBounce) {
        if (atTop && currentScrollTop < lastScrollTop.current) {
          direction = null;
        } else if (atBottom && currentScrollTop > lastScrollTop.current) {
          direction = null;
        } else {
          direction = currentScrollTop > lastScrollTop.current ? "down" : "up";
          lastValidScrollTop.current = currentScrollTop;
        }
      } else {
        direction = currentScrollTop > lastScrollTop.current ? "down" : "up";
        lastValidScrollTop.current = currentScrollTop;
      }

      if (direction !== null) {
        debouncedSetDirection(direction);
        lastScrollTop.current = currentScrollTop;
      }
    }
  }, [enabled, containerRef, threshold, debouncedSetDirection, debounceWait, preventBounce]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    isAtTop.current = container.scrollTop <= 0;
    isAtBottom.current = container.scrollTop + clientHeight >= scrollHeight - 1;
    lastValidScrollTop.current = container.scrollTop;

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, handleScroll, enabled]);

  return {
    scrollDirection,
    lastScrollTop: lastScrollTop.current,
    isAtTop: isAtTop.current,
    isAtBottom: isAtBottom.current
  };
};
