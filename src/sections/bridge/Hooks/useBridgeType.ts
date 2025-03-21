import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

const toolMap: any = {
    orbiter: {
        name: "Orbiter",
        icon: "https://assets.dapdap.net/images/100-obiter.png",
        type: "bridge",
        link: "",
    },
}

export default function useBridgeType() {
    const { dapp: dappName } = useParams();

    const bridgeType = useMemo(() => {
        if (dappName) {
            return toolMap[(dappName as string).toLowerCase()] || toolMap.orbiter
        }
        return toolMap.orbiter
    }, [dappName])


    return {
        bridgeType
    }
}