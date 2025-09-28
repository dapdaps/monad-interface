import { useUser } from "@/hooks/use-user";
import { get } from "@/utils/http";
import { useCallback, useEffect, useState } from "react";

export default function useGameUser() {
    const { userInfo } = useUser();
    const [gameUser, setGameUser] = useState<any>({
        profit: 0,
        total_play_times: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchGameUser = useCallback(async () => {
        if (isLoading) {    
            return;
        }

        setIsLoading(true);
        const res = await get("/game/user/stats");
        setGameUser(res.data);
        setIsLoading(false);
    }, [isLoading]);

    useEffect(() => {
        if (!userInfo.address) {
            return;
        }
        fetchGameUser();
    }, [userInfo]);

    return {
        gameUser,
        isLoading,
    }
}