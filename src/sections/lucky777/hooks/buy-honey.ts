import { useState } from 'react';

export function useBuyHoney() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = (_visible?: boolean) => {
    setVisible(typeof _visible === "boolean" ? _visible : !visible);
  };

  return {
    visible,
    toggleVisible,
  };
}
