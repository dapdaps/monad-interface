import { useState, useEffect, useCallback } from 'react';
import { useTwitterStore } from '@/stores/twitter';
import { useNftStore } from '@/stores/nft';
import useToast from '@/hooks/use-toast';
import { get, post, AUTH_TOKENS } from '@/utils/http';
import useAccount from '@/hooks/use-account';
import { sleep } from '@/sections/bridge/lib/util';

export const IS_REAL_FOLLOW = true
export default function useXFollow() {
    const [isFollow, setIsFollow] = useState(false);
    const twitterStore: any = useTwitterStore();
    const isFollowNADSA = useNftStore((store: any) => store.isFollowNADSA);
    const setNftStore = useNftStore((store: any) => store.set);
    const { success, fail } = useToast();
    const { account } = useAccount();
    const [isLoadingFollow, setIsLoadingFollow] = useState(false);

    const checkFollowRelationship = async () => {
        if (!twitterStore.info) return;

        try {
            setIsLoadingFollow(true);
            const res = await get('/twitter/user/check_follow_relationship', {
                target_user_name: encodeURIComponent('0xNADSA')
            });

            const data = res.data;

            if (res.code === 200) {
                // setIsFollow(data.following);
                // setNftStore({ isFollowNADSA: data.following });
            } else {
                fail(data.message || 'Check follow relationship failed');
            }
        } catch (error) {
            console.error('Check follow relationship error:', error);
            fail('Check follow relationship failed');
        } finally {
            setIsLoadingFollow(false);
        }
    };

    // useEffect(() => {
    //     if (twitterStore.id && !isFollowNADSA && account) {
    //         (async () => {
    //             let tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
    //             while (!tokens.state?.accessToken?.access_token) {
    //                 await sleep(1000);
    //                 tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || "{}");
    //             }
    //             checkFollowRelationship();
    //         })();
    //     }
    // }, [twitterStore.id, isFollowNADSA, account]);

    const checkFollowX = useCallback(() => {
        if (IS_REAL_FOLLOW) {
            checkFollowRelationship()
            return;
        }
        setIsLoadingFollow(true);
        setTimeout(() => {
            setIsLoadingFollow(false);
        }, 3000);
    }, []);

    const setFollowX = useCallback(() => {
        if (!IS_REAL_FOLLOW) {
            setNftStore({ isFollowNADSA: true });
        }
    }, []);

    return {
        checkFollowRelationship,
        isFollow: isFollowNADSA || isFollow,
        isLoadingFollow,
        checkFollowX,
        setFollowX,
    };
}
