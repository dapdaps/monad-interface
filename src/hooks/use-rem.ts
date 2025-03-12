import { useEffect } from 'react';
import { useEventListener, useDebounceFn } from 'ahooks';

function useRem(designWidth = 1440, baseFontSize = 14.4) {
  if (typeof document === 'undefined' || !document.documentElement.style.getPropertyValue('--rem')) {
    document.documentElement.style.setProperty('--rem', `${baseFontSize}px`);
  }

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
      document.documentElement.style.removeProperty('--rem');
    };
  }, []);

  useEventListener('resize', debounceSetRem);
}

export default useRem;