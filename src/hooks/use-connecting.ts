import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { useDebounceFn } from 'ahooks';

export function useConnecting() {
  const { isConnecting, isConnected } = useAccount();

  const [walletConnecting, setWalletConnecting] = useState<boolean>(true);

  const { run: closeConnecting, cancel: cancelCloseConnecting } = useDebounceFn(
    () => {
      setWalletConnecting(false);
    },
    { wait: 10000 }
  );

  useEffect(() => {
    cancelCloseConnecting();
    if (!isConnecting) {
      setWalletConnecting(false);
      return;
    }
    setWalletConnecting(true);
    closeConnecting();
  }, [isConnecting]);

  return {
    walletConnecting,
    walletConnected: isConnected,
  };
}
