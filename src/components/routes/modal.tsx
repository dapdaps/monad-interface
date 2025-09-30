import Modal from "../modal";
import Routes from "./index";
import { Chain, Token } from "@/types";

export default function RoutesModal({
    routes,
    fromChain,
    selectedRoute,
    setSelectedRoute,
    inputCurrency,
    outputCurrency,
    open,
    onClose
}: {
    routes: any[],
    fromChain: Chain,
    selectedRoute: any,
    inputCurrency: any,
    outputCurrency: any,
    setSelectedRoute: (route: any) => void,
    open: boolean,
    onClose: () => void
}) {
    return <Modal open={open} onClose={onClose} closeIcon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="1" y1="-1" x2="15.4566" y2="-1" transform="matrix(-0.707117 0.707097 -0.707117 -0.707097 11.6367 0)" stroke="#727D97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6.1819 6.182L1.09082 1.09106M8.72743 8.72746L12.0003 12.0002" stroke="#727D97" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    }>
        <Routes routes={routes} fromChain={fromChain} inputCurrency={inputCurrency} outputCurrency={outputCurrency} selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
    </Modal>
}   