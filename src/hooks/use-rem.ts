import { useEffect } from 'react';
import { useEventListener, useDebounceFn } from 'ahooks';

function useRem(designWidth = 1440, baseFontSize = 14.4) {
  const setRem = () => {
    const scale = window.innerWidth / designWidth;
    document.documentElement.style.setProperty('--rem', `${baseFontSize * scale}px`);
  };

  const { run: debounceSetRem } = useDebounceFn(setRem, {
    wait: 100, 
  });

  useEffect(() => {
    setRem();
    return () => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--rem', `${baseFontSize}px`);
      }
    };
  }, []);

  useEventListener('resize', debounceSetRem, { target: typeof window !== 'undefined' ? window : undefined });
}

export default useRem;