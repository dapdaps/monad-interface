import type { Chain, Token } from "@/types";
import Route from "./Route";

export default function Routes({ routes, fromChain, inputCurrency, outputCurrency, selectedRoute, setSelectedRoute }: { routes: any[], fromChain: Chain, inputCurrency: any, outputCurrency: any, selectedRoute: any, setSelectedRoute: (route: any) => void }) {
    
    return <div className="border border-[#34304B] w-[369px] rounded-[4px] bg-[#22202F] p-[10px]">
        <div className="text-[18px] text-white py-[10px] pl-[10px]">Select Route</div>
        {
            routes.map((route: any, index) => (
                <Route
                    checked={selectedRoute === route}
                    key={route.name + index}
                    name={route.name}
                    inputCurrency={inputCurrency}
                    outputCurrency={outputCurrency}
                    inputCurrencyAmount={route.inputCurrencyAmount}
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