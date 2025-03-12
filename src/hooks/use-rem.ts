import { useLayoutEffect } from 'react';
import { useEventListener, useDebounceFn } from 'ahooks';

function useRem(designWidth = 1440, baseFontSize = 14.4) {
  const setRem = () => {
    const scale = window.innerWidth / designWidth;
    document.documentElement.style.setProperty('--rem', `${baseFontSize * scale}px`);
  };

  const { run: debounceSetRem } = useDebounceFn(setRem, {
    wait: 100, 
  });

  useLayoutEffect(() => {
    setRem(); 
  }, [designWidth, baseFontSize]);

  useEventListener('resize', debounceSetRem);
}

export default useRem;