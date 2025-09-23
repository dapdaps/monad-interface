import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { useEffect, useMemo, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useUserStore } from '@/stores/user';
import { formatLongText } from '@/utils/utils';
import { DEFAULT_CHAIN_ID } from '@/configs';
import { numberFormatter } from '@/utils/number-formatter';
import { utils } from 'ethers';
import Big from 'big.js';

export function useConnectWallet() {
  const connectModal = useConnectModal();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId, chain, isConnecting } = useAccount();
  const userInfo = useUserStore((store: any) => store.user);

  const balanceData = useBalance({
    address,
    chainId: DEFAULT_CHAIN_ID
  });

  const [connecting, setConnecting] = useState<boolean>(isConnecting);

  const { run: closeConnecting, cancel: cancelCloseConnecting } = useDebounceFn(
    () => {
      setConnecting(false);
    },
    { wait: 10000 }
  );

  useEffect(() => {
    cancelCloseConnecting();
    if (!isConnecting) {
      setConnecting(false);
      return;
    }
    setConnecting(true);
    closeConnecting();
  }, [isConnecting]);

  const onConnect = () => {
    !address && connectModal.openConnectModal?.();
  };

  const [name, avatar, balance] = useMemo(() => {
    const defaultAvatar = "conic-gradient(from 180deg at 50% 50%, #00D1FF 0deg, #FF008A 360deg)";
    let _balance = "0.00";

    if (!address) return ["", defaultAvatar, _balance];

    if (balanceData?.data?.value) {
      const _balanceValue = utils.formatUnits(balanceData.data.value.toString(), balanceData.data.decimals);
      _balance = numberFormatter(_balanceValue, 2, true, {
        isShort: Big(_balanceValue || 0).gt(1000000),
        isShortUppercase: true,
        isZeroPrecision: true,
      });
    }

    if (userInfo?.twitter) {
      return [
        formatLongText(userInfo?.twitter?.twitter_user_name, 10, 4),
        `url("${userInfo?.twitter?.twitter_avatar}")`,
        _balance
      ];
    }

    return [
      formatLongText(address, 5, 4),
      defaultAvatar,
      _balance
    ];
  }, [userInfo, address, balanceData]);

  return {
    onConnect,
    onDisconnect: disconnect,
    chainId,
    chain,
    connecting,
    connected: isConnected,
    name,
    avatar,
    balance,
  };
}
