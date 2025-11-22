import { useEffect, useMemo, useState } from "react";
import { tokenPairs as orbiterTokenPairs } from "../lib/bridges/orbiter/config";

export default function useChainAndTokenPair({ bridgeType }: { bridgeType: string }) {
    
    const chains = useMemo(() => {
        if (bridgeType.toLowerCase() === 'orbiter') {
            return Object.keys(orbiterTokenPairs);
        }

        return [];
    }, [bridgeType]);

    const tokenPairs = useMemo(() => {
        if (bridgeType.toLowerCase() === 'orbiter') {
            return orbiterTokenPairs;
        }

        return [];
    }, [bridgeType]);

    const destDisabled = useMemo(() => {
        if (bridgeType.toLowerCase() === 'orbiter') {
            return true;
        }

        return ;
    }, [bridgeType]);

    return { 
        chains,
        tokenPairs,
        destDisabled,
     };
}