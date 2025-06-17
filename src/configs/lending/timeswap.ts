import { monad } from "../tokens/monad-testnet";
import { monadTestnet } from 'viem/chains';

const basic = {
  name: 'Timeswap',
  type: 'Lending',
  icon: '/images/dapps/icons/timeswap.svg',
  path: '/lending/timeswap',
};

const networks = {
  [monadTestnet.id]: {
    lendContract: "0x7777e0A217454c666Ef68ADFFfEC1C07B8E33D01",
    withdrawContract: "0x73443A7B9c3780DCadcA2aEE8f6Be3119E06A999",
    borrowContract: "0x8df949a3B19Fb93f1407E8ee7631783824d2c832",
    repayContract: "0x6A8f13aCA99A0D4897a4B32B93653d31F586c247",
    timeswapV2TokenNft: "0x57767bD10ddAeE70F382b0c20F78D9194948A08b",
    poolListApi: "https://api-prod.timeswap.io/api/v1/pool-list/",
    marketOrderKey: "tvl",
    yoursOrderKey: "maturity",
    markets: [
      // WMONAD/shMON
      {
        id: "67d12a9d-7d28-4a68-8f1f-227c7c708674",
        tokens: [
          {
            ...monad.wmon,
            icon: "/images/tokens/WMONAD.svg",
          },
          monad.shmon,
        ],
        transitionPrice01: 1.02040816,
        transitionPrice10: 0.98,
        duration: 60,
        disabledLend: true,
      },
      // USDT/WMONAD
      {
        id: "7fd07692-cd2d-4ffc-b19c-5b379d9332ba",
        tokens: [
          monad.usdt,
          {
            ...monad.wmon,
            icon: "/images/tokens/WMONAD.svg",
          },
        ],
        transitionPrice01: 0.66666666,
        transitionPrice10: 1.5,
        duration: 90,
        disabledLend: true,
      },
      // shMON/WBTC
      // {
      //   id: "7156f0f9-ac21-40a3-ac40-0801903d9b5f",
      //   tokens: [
      //     monad.shmon,
      //     monad.wbtc,
      //   ],
      //   transitionPrice01: 0.0001,
      //   transitionPrice10: 10000,
      //   duration: 60,
      // },
      // shMON/WSOL
      // {
      //   id: "16bb51fc-0b5d-4b44-b76b-918f5014b6c5",
      //   tokens: [
      //     monad.shmon,
      //     monad.wsol,
      //   ],
      //   transitionPrice01: 0.06666667,
      //   transitionPrice10: 15,
      //   duration: 90,
      // },
    ],
  }
};

export default { basic, networks };
