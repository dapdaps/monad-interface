import { toast } from 'react-toastify';
import Toast from '@/components/toast';
import ToastGame from '@/components/toast/indexGame';

// 3s
const ToastAutoCloseDuration = 3000;

export default function useToast({
  isGame = false
}: {
  isGame?: boolean
} = {}) {
  const success = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    return toast(isGame ? <ToastGame type="success" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="success" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      }
    });
  };
  const fail = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    return toast(isGame ? <ToastGame type="error" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="error" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      }
    });
  };
  const info = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    return toast(isGame ? <ToastGame type="info" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="info" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      }
    });
  };
  const loading = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    return toast(isGame ? <ToastGame type="pending" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="pending" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      }
    });
  };
  return {
    success,
    fail,
    info,
    loading,
    dismiss: toast.dismiss,
  };
}

export function formatContractRejectedError(error: any, defaultMsg?: string): string {
  if (error?.message?.includes('user rejected transaction')) {
    return 'User rejected transaction';
  }
  return defaultMsg || '';
}
