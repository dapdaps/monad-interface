import { post } from "@/utils/http";
import { useRequest } from "ahooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useToast from "./use-toast";
import useUser from "./use-user";

export const useXBind = () => {
    const searchParams = useSearchParams();
    const toast = useToast();
    const { getUserInfo } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const { runAsync: bindX, loading: bindXLoading, error: bindXError, data: bindXData } = useRequest(async () => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const redirectUri = window.location.origin.includes('localhost') ? window.location.origin : window.location.origin +'/api/twitter_auth';
        
        if (code && state) {
            const res = await post('/twitter/bind', {
                code,
                redirect_uri: redirectUri,
            });

            if (res.code !== 200) {
                toast.fail({
                    title: "Bind twitter failed!",
                    text: res.msg,
                });
                return null;
            }

            toast.success({
                title: "Bind twitter successful!",
            });

            await getUserInfo();

            router.replace(pathname);

            return res.data;
        }
    }, { manual: true });


    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        if (code && state) {
            bindX()
        }
    }, [searchParams]);

    return {
        bindXData
    };
}