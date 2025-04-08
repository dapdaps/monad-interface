import { monad } from "../tokens/monad-testnet";
import { monadTestnet } from '@reown/appkit/networks';

const basic = {
  name: 'Timeswap',
  icon: '/images/dapps/icons/timeswap.svg',
  path: '/lending/timeswap',
};

const networks = {
  [monadTestnet.id]: {
    lendContract: "0x7777e0A217454c666Ef68ADFFfEC1C07B8E33D01",
    closeLendContract: "0x73443A7B9c3780DCadcA2aEE8f6Be3119E06A999",
    borrowContract: "0x8df949a3B19Fb93f1407E8ee7631783824d2c832",
    repayContract: "0x6A8f13aCA99A0D4897a4B32B93653d31F586c247",
    timeswapV2TokenNft: "0x57767bD10ddAeE70F382b0c20F78D9194948A08b",
    poolListApi: "https://api-prod.timeswap.io/api/v1/pool-list/",
    markets: [
      // WMONAD/shMON
      {
        id: "67d12a9d-7d28-4a68-8f1f-227c7c708674",
        tokens: [
          monad.wmon,
          monad.shmon,
        ],
      },
      // USDT/WMONAD
      {
        id: "7fd07692-cd2d-4ffc-b19c-5b379d9332ba",
        tokens: [
          monad.usdt,
          monad.wmon,
        ],
      }
    ],
  }
};

export default { basic, networks };
