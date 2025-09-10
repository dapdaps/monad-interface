import type { Chain, Token } from "@/types";
import Route from "./Route";

export default function Routes({ routes, fromChain, toToken, selectedRoute, setSelectedRoute }: { routes: any[], fromChain: Chain, toToken: Token, selectedRoute: any, setSelectedRoute: (route: any) => void }) {
    
    return <div className="border border-[#373A53] rounded-[12px] mt-[17px] md:bg-[#2D304F]/60 backdrop-blur-[10px] lg:bg-white/5">
        {
            routes.map((route: any, index) => (
                <Route
                    checked={selectedRoute === route}
                    key={route.name + index}
                    name={route.name}
                    toToken={toToken}
                    fee={route.fee}
                    receiveAmount={route.outputCurrencyAmount}
                    fromChain={fromChain} 
                    icon={route.icon}
                    duration={route.duration}
                    feeType={route.feeType}
                    gas={route.gas}
                    onChange={() => {
                        setSelectedRoute(route)
                    }}
                />
            ))
        }
    </div>
}