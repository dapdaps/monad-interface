import { useState, useEffect } from 'react';
import { useTwitterStore } from '@/stores/twitter';
import { useNftStore } from '@/stores/nft';
import useToast from '@/hooks/use-toast';
import { get, post } from '@/utils/http';
import useAccount from '@/hooks/use-account';

export default function useXFollow() {
    const [isCheckFollowLoading, setIsCheckFollowLoading] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const twitterStore: any = useTwitterStore();
    const isFollowNADSA = useNftStore((store: any) => store.isFollowNADSA);
    const setNftStore = useNftStore((store: any) => store.set);
    const { success, fail } = useToast();
    const { account } = useAccount();

    const checkFollowRelationship = async () => {
        if (!twitterStore.info) return;

        try {
            setIsCheckFollowLoading(true);
            const res = await get('/twitter/user/check_follow_relationship', {
                target_user_name: encodeURIComponent('0xNADSA')
            });

            const data = res.data;

            if (res.code === 200) {
                setIsFollow(data.following);
                setNftStore({ isFollowNADSA: data.following });
            } else {
                fail(data.message || 'Check follow relationship failed');
            }
        } catch (error) {
            console.error('Check follow relationship error:', error);
            fail('Check follow relationship failed');
        } finally {
            setIsCheckFollowLoading(false);
        }
    };

    useEffect(() => {
        if (twitterStore.id && !isFollowNADSA && account) {
            setTimeout(() => {
                checkFollowRelationship();
            }, 1000);
        }
    }, [twitterStore.id, isFollowNADSA, account]);

    return {
        isCheckFollowLoading,
        checkFollowRelationship,
        isFollow: isFollowNADSA || isFollow
    };
}
