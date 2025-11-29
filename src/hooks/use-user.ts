import { useUserStore } from "@/stores/user";
import { useCallback } from "react";
import { get, post } from "@/utils/http";
import {
  useAccount,
  useDisconnect,
  useSignMessage,
  useSwitchChain
} from "wagmi";
import useToast from "@/hooks/use-toast";
import { useWalletName } from "@/hooks/use-wallet-name";
import { useConnectedWalletsStore } from "@/stores/useConnectedWalletsStore";
import { usePathname } from "next/navigation";
import { DEFAULT_CHAIN_ID } from "@/configs";

let isSigning = false;
export function useUser() {
  const { address } = useAccount();
  const { name: walletName } = useWalletName();
  const toast = useToast();
  const { signMessage } = useSignMessage();
  const { switchChainAsync } = useSwitchChain();
  const accessToken = useUserStore(
    (store: any) => store.accessToken?.access_token
  );
  const accessTokenLoading = useUserStore(
    (store: any) => store.accessTokenLoading
  );
  const userInfo = useUserStore((store: any) => store.user);
  const userInfoLoading = useUserStore((store: any) => store.loading);
  const setUserInfo = useUserStore((store: any) => store.set);
  const { disconnect } = useDisconnect();

  const { connectedWallets } = useConnectedWalletsStore();

  const pathname = usePathname();

  const isNearPage = ["/bintent", "/my-near-wallet-gateway"].includes(pathname);
  const near_current_wallet =
    connectedWallets.length > 0 ? connectedWallets[0] : null;

  const getUserInfo = useCallback(async () => {
    setUserInfo({ loading: true });
    try {
      const result = await get("/user");
      const data = result?.data || {};
      setUserInfo({ user: data, loading: false });
      return data;
    } catch (err) {
      console.log("getUserInfo failed: %o", err);
      setUserInfo({ user: {}, loading: false });
      return {};
    }
  }, []);

  const getAccessToken = async (from?: string) => {
    if (!address) {
      return;
    }

    if (isSigning) return;

    const tokens = JSON.parse(window.localStorage.getItem("_user") || "{}");
    if (tokens.state?.accessToken?.access_token) {
      isSigning = false;
      return;
    }

    console.log("from:", from);

    isSigning = true;

    setUserInfo({
      accessTokenLoading: true,
      accessToken: {
        access_token: "",
        refresh_access_token: "",
        token_type: "bearer"
      }
    });
    const currentAddress =
      isNearPage && near_current_wallet ? near_current_wallet.address : address;

    if (!currentAddress) {
      setUserInfo({
        user: {},
        accessToken: {
          access_token: "",
          refresh_access_token: "",
          token_type: "bearer"
        },
        accessTokenLoading: false
      });

      isSigning = false;
      return;
    }

    // register
    // const checkedRes = await checkAccount({
    //   address: currentAddress,
    // });
    let _walletName = walletName ?? "";
    const isBitget = _walletName.toLowerCase().includes("bitget");
    const isCoin98 = _walletName.toLowerCase().includes("coin98");
    const isOkx = _walletName.toLowerCase().includes("okx");
    if (isBitget) {
      _walletName = "bitget";
    }

    // if (!checkedRes.isActivated) {
    //   const activateRes = await activateAccount({
    //     address: currentAddress,
    //     code: '',
    //     source: isBitget ? 'bitget_wallet' : isCoin98 ? 'coin98_wallet' : isOkx ? 'okx_wallet' : '',
    //     wallet:  _walletName.toLowerCase(),
    //   });
    //   if (!activateRes.isSuccess && !isNearPage) {
    //     toast.fail({
    //       title: 'Account activated failed, please try again later!',
    //       message: activateRes?.message ?? '',
    //     });
    //   }
    // }

    if (!address) {
      isSigning = false;
      return;
    }

    const msg = `By signing this message, you confirm that you are the owner of ${currentAddress?.toLowerCase()}`;

    await switchChainAsync({
      chainId: DEFAULT_CHAIN_ID
    });

    const waitSwitchChain = () =>
      new Promise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(true);
        }, 1000);
      });
    await waitSwitchChain();

    return new Promise((resolve, reject) => {
      signMessage(
        {
          message: msg
        },
        {
          onSuccess: async (signedMessage) => {
            const res = await post("/login", {
              address: currentAddress,
              wallet: _walletName.toLowerCase(),
              signature: signedMessage,
              invite_code: window.localStorage.getItem("referral_code") || ""
            });
            if (res.code === 200) {
              setUserInfo({
                accessToken: res.data,
                accessTokenLoading: false
              });
              await getUserInfo();
              isSigning = false;
              resolve(null);
            } else {
              toast.fail({
                title: "Login failed, please try again later!",
                message: res.data?.message
              });
              disconnect();
              isSigning = false;
            }
          },
          onError: (error) => {
            console.log("error:", error);
            disconnect();
            isSigning = false;
            reject(error);
          }
        }
      );
    });

    // console.log('signedMessage:', signedMessage);
  };

  const bindGameAddress = async (address: string, account: string) => {
    const res = await post("/game/login", {
      address,
      account
    });
    if (res.code === 200) {
      await getUserInfo();
    } else {
      if (res.code === 10007) {
        toast.fail({
          title:
            "The Privy address is already bound. Please change the email and log in again.",
          message: res.data?.message
        });
      } else {
        toast.fail({
          title: "Bind game address failed, please try again later!",
          message: res.data?.message
        });
      }
    }

    return res.code;
  };

  // useEffect(() => {
  //   (async () => {
  //     if (!address || isSigning) return;
  //     isSigning = true
  //     const msg = `By signing this message, you confirm that you are the owner of ${address.toLowerCase()}`

  //     signMessage({
  //       message: msg,
  //     }, {
  //       onSuccess: (signedMessage) => {
  //         console.log('signedMessage:', signedMessage);
  //         isSigning = true;
  //       },
  //       onError: (error) => {
  //         console.log('error:', error);
  //         isSigning = true;
  //       },
  //       onSettled: () => {
  //         isSigning = true;
  //       },

  //     });
  //   })();
  // }, [address]);

  return {
    userInfo,
    userInfoLoading,
    accessToken,
    accessTokenLoading,
    getUserInfo,
    getAccessToken,
    bindGameAddress
  };
}

export default useUser;

const checkAccount = async (params: any) => {
  try {
    const checkedRes = await get(`/api/invite/check-address/${params.address}`);
    return {
      isActivated: !!checkedRes?.data?.is_activated,
      message: checkedRes.msg
    };
  } catch (err: any) {
    console.log(err);
    return {
      isActivated: false,
      message: err?.message ?? ""
    };
  }
};

const activateAccount = async (params: any) => {
  try {
    const activateRes = await post(`/api/invite/activate`, params);
    return {
      isSuccess: !!activateRes.data?.is_success,
      message: activateRes.msg
    };
  } catch (err: any) {
    console.log(err);
    return {
      isSuccess: false,
      message: err?.message ?? ""
    };
  }
};
