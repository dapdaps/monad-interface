import useCustomAccount from "@/hooks/use-account";
import useToast from "@/hooks/use-toast";
import { get, post } from "@/utils/http";
import { mainnet } from 'viem/chains';
import Big from "big.js";
import { useEffect, useState } from "react";
import { useBalance, useTransactionCount } from 'wagmi';
import useCheckinList from "./use-checkin-list";

export default function useCheckin() {
  const { account, accountWithAk } = useCustomAccount();
  const { data: txCount, isLoading } = useTransactionCount({
    address: account,
    chainId: mainnet.id,
  })

  const { loading, checkinList, getCheckinList } = useCheckinList()


  useEffect(() => {
    if (account) {
      getCheckinList()
    }
  }, [account])

  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaId, setCaptchaId] = useState("")
  const [captchaSolution, setCaptchaSolution] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)
  const [checkinSuccess, setCheckinSuccess] = useState(false)
  const toast = useToast()

  const {
    data,
    refetch: refetchEthereumMainnetBalance,
  } = useBalance({
    address: account as `0x${string}`,
    chainId: mainnet.id,
  });

  async function handleGetCaptcha() {
    try {
      setCaptchaLoading(true)
      if (checkinList?.length === 0) {
        const { data: ethereumMainnetBalance } = await refetchEthereumMainnetBalance()
        if (ethereumMainnetBalance && Big(ethereumMainnetBalance?.formatted || 0).lt(0.01)) {
          setErrorMsg("To check in and get MON, you need at least 0.01 ETH on Ethereum.")
          setCaptchaLoading(false)
          return
        }
        if (txCount < 1) {
          setErrorMsg("To check in and get MON, you need at least one transaction history on Ethereum.")
          setCaptchaLoading(false)
          return
        }
      }

      const result = await get("/captcha/generate")
      setCaptchaId(result?.data?.captcha_id ?? "")
      setCaptchaLoading(false)
    } catch (error) {
      setCaptchaLoading(false)
      throw new Error(error)
    }
  }
  async function handleCheckIn() {
    try {
      const result = await post("/checkin", null, {
        CaptchaId: captchaId,
        CaptchaSolution: captchaSolution
      })
      if (result.code === 200) {
        setCheckinSuccess(true)
      } else {
        throw new Error(result?.message)
      }
    } catch (error) {
      setErrorMsg(error?.message)
      handleGetCaptcha()
    }
  }
  return {
    captchaLoading,
    captchaId,
    setCaptchaId,
    captchaSolution,
    setCaptchaSolution,
    errorMsg,
    setErrorMsg,
    checkinSuccess,
    setCheckinSuccess,
    handleCheckIn,
    handleGetCaptcha
  }
}