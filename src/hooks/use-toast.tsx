import { Id, toast } from 'react-toastify';
import Toast from '@/components/toast';
import ToastGame from '@/components/toast/indexGame';
import { useRef } from 'react';

// 3s
const ToastAutoCloseDuration = 3000;

export default function useToast({
  isGame = false
}: {
  isGame?: boolean
} = {}) {

  const toastIds = useRef<Id[]>([]);
  const removeFirstToast = () => {
    if (!isGame) {
      return;
    }
    if (toastIds.current.length < 3) {
      return;
    }
    const firsteId = toastIds.current.shift();
    if (firsteId) {
      toast.dismiss(firsteId);
      toast.clearWaitingQueue();
    }
  }

  const onClose = (toastId: Id) => {
    toastIds.current = toastIds.current.filter((id) => id !== toastId);
  }
  const success = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    removeFirstToast();
    const toastId = toast(isGame ? <ToastGame type="success" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="success" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      },
      onClose: () => {
        onClose(toastId);
      }
    });
    toastIds.current.push(toastId);
    return toastId;
  };
  const fail = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    removeFirstToast();
    const toastId = toast(isGame ? <ToastGame type="error" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="error" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      },
      onClose: () => {
        onClose(toastId);
      }
    });
    toastIds.current.push(toastId);
    return toastId;
  };
  const info = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    removeFirstToast();
    const toastId = toast(isGame ? <ToastGame type="info" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="info" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      },
      onClose: () => {
        onClose(toastId);
      }
    });
    toastIds.current.push(toastId);
    return toastId;
  };
  const loading = (params: any, position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left' = 'top-right') => {
    removeFirstToast();
    const toastId = toast(isGame ? <ToastGame type="pending" duration={ToastAutoCloseDuration} {...params} /> : <Toast type="pending" duration={ToastAutoCloseDuration} {...params} />, {
      position,
      autoClose: ToastAutoCloseDuration,
      style: {
        margin: 0,
        padding: 0,
        background: 'transparent',
      },
      onClose: () => {
        onClose(toastId);
      }
    });
    toastIds.current.push(toastId);
    return toastId;
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
