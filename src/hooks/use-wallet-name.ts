import { useAccount as useWagmiAccount, useConnectors } from 'wagmi';
import { useMemo } from 'react';

export function useWalletName() {
  const { connector } = useWagmiAccount();
  const connectors = useConnectors();

  const info = useMemo(() => {
    const currentConnector = connectors.find((c) => c.id === connector?.id);

    let walletName = connector?.name || '';
    let walletIcon = connector?.icon || '';
    if (!walletName && currentConnector) {
      walletName = currentConnector.name || connector?.name || 'Unknown Wallet';
      walletName = walletName.replace(/^io\./, '');
    }
    if (!walletIcon && currentConnector) {
      walletIcon = currentConnector.icon || '';
    }
    return { name: walletName, icon: walletIcon };
  }, [connector, connectors]);

  return { ...info };
}
