import type { Token } from "@/types";

const CHAIN_ID = 143;

export const monad: { [key: string]: Token } = {
  mon: {
    address: "native",
    isNative: true,
    chainId: CHAIN_ID,
    symbol: "MON",
    decimals: 18,
    name: "MON",
    icon: "/images/monad.svg",
    color: "#78350F"
  },
  usdc: {
    address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
    chainId: CHAIN_ID,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "https://assets.dapdap.net/monad/usdc.png",
    color: "#78350F"
  },
  wmon: {
    address: "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A",
    chainId: CHAIN_ID,
    symbol: "WMON",
    decimals: 18,
    name: "Wrapped Monad",
    icon: "https://assets.dapdap.net/monad/wmon.png",
    color: "#78350F"
  },
  usdt0: {
    symbol: "USDT0",
    address: "0xe7cd86e13ac4309349f30b3435a9d337750fc82d",
    chainId: CHAIN_ID,
    decimals: 6,
    name: "Tether USD",
    icon: "https://assets.dapdap.net/monad/usdt.png"
  },
  ausd: {
    address: "0x00000000efe302beaa2b3e6e1b18d08d69a9012a",
    chainId: CHAIN_ID,
    symbol: "AUSD",
    decimals: 6,
    name: "AUSD",
    icon: "https://assets.dapdap.net/monad/ausd.png"
  },
  // drops: {
  //   address: "0x68b571f834c9853d2a7e8e364d28db52de47d46d",
  //   chainId: CHAIN_ID,
  //   symbol: "DROPS",
  //   decimals: 18,
  //   name: "DROPS",
  //   icon: "https://assets.dapdap.net/monad/drops.png"
  // },
  weth: {
    address: "0xee8c0e9f1bffb4eb878d8f15f368a02a35481242",
    chainId: CHAIN_ID,
    symbol: "WETH",
    decimals: 18,
    name: "Wrapped Ether",
    icon: "https://assets.dapdap.net/monad/weth.png"
  },
  sol: {
    address: "0xea17e5a9efebf1477db45082d67010e2245217f1",
    chainId: CHAIN_ID,
    symbol: "SOL",
    decimals: 18,
    name: "SOL",
    icon: "https://assets.dapdap.net/monad/wsol.png"
  },
  smon: {
    address: "0xa3227c5969757783154c60bf0bc1944180ed81b9",
    chainId: CHAIN_ID,
    symbol: "sMON",
    decimals: 18,
    name: "sMON",
    icon: "https://assets.dapdap.net/monad/smon.png"
  },
  gmon: {
    address: "0x8498312a6b3cbd158bf0c93abdcf29e6e4f55081",
    chainId: CHAIN_ID,
    symbol: "gMON",
    decimals: 18,
    name: "gMON",
    icon: "https://assets.dapdap.net/monad/gmon.png"
  },
  shmon: {
    address: "0x1b68626dca36c7fe922fd2d55e4f631d962de19c",
    chainId: CHAIN_ID,
    symbol: "ShMonad",
    decimals: 18,
    name: "shMON",
    icon: "https://assets.dapdap.net/monad/shmon.png"
  },
  aprmon: {
    address: "0x0c65a0bc65a5d819235b71f554d210d3f80e0852",
    chainId: CHAIN_ID,
    symbol: "aprMON",
    decimals: 18,
    name: "aPriori Monad LST",
    icon: "https://assets.dapdap.net/monad/aprmon.png"
  },
  wsteth: {
    address: "0x0c65a0bc65a5d819235b71f554d210d3f80e0852",
    chainId: CHAIN_ID,
    symbol: "wstETH",
    decimals: 18,
    name: "Wrapped liquid staked Ether 2.0",
    icon: "https://assets.dapdap.net/monad/wstETHlogo.png"
  },
  wbtc: {
    address: "0x0555e30da8f98308edb960aa94c0db47230d2b9c",
    chainId: CHAIN_ID,
    symbol: "WBTC",
    decimals: 8,
    name: "Wrapped BTC",
    icon: "https://assets.dapdap.net/monad/wbtc.png"
  },
  gmonad: {
    address: "0x3ff60900b70db8d0bde4d4819f028673718c5d1b",
    chainId: CHAIN_ID,
    symbol: "GMONAD",
    decimals: 18,
    name: "Gmonad",
    icon: "https://assets.dapdap.net/monad/gmonad.jpg"
  },
  molandak: {
    address: "0xd32e9ddd968b18e8429f2d1da7efb2cc1f01d42d",
    chainId: CHAIN_ID,
    symbol: "MOLANDAK",
    decimals: 18,
    name: "molandak",
    icon: "https://assets.dapdap.net/monad/molandak.jpg"
  },
  monadp: {
    address: "0x25ac11cb986ca6910501803af5b4e41cf3ad9999",
    chainId: CHAIN_ID,
    symbol: "MonadP",
    decimals: 9,
    name: "MonadPrinter",
    icon: "https://assets.dapdap.net/monad/monad-printer.jpg"
  },
  alalert: {
    address: "0x045a4ac94a30dd9e8de963473e08b9d784b340f9",
    chainId: CHAIN_ID,
    symbol: "AIALERT",
    decimals: 18,
    name: "AI Alert",
    icon: "https://assets.dapdap.net/monad/alalert.jpg"
  },
  '150K': {
    address: "0x97fb300c16ca465854698e8d9e72b5453c6f4db0",
    chainId: CHAIN_ID,
    symbol: "150K",
    decimals: 18,
    name: "BTC 150K",
    icon: "https://assets.dapdap.net/monad/150k.jpg"
  },
  '10000000': {
    address: "0x8946fb1d421e8d47d9972c275888ebd32f2edcc9",
    chainId: CHAIN_ID,
    symbol: "10000000",
    decimals: 18,
    name: "CULT",
    icon: "https://assets.dapdap.net/monad/10000000.jpg"
  },
  '49ers': {
    address: "0x791d36b6a9a7cf952f0e2de2781f8352f7cb1661",
    chainId: CHAIN_ID,
    symbol: "49ERS",
    decimals: 18,
    name: "49ers Gold Rush",
    icon: "https://assets.dapdap.net/monad/49ers.jpg"
  },
  '49rgr': {
    address: "0x725544ecf3cd54d0bbd7da6d32885df9c7b75950",
    chainId: CHAIN_ID,
    symbol: "49RGR",
    decimals: 18,
    name: "49er Gold Rush",
    icon: "https://assets.dapdap.net/monad/49rgr.jpg"
  },
  airmf: {
    address: "0x349c93bb954409a9f0b8099f52ccce014720308c",
    chainId: CHAIN_ID,
    symbol: "AIRMF",
    decimals: 18,
    name: "Ai Risk Management Framework Token",
    icon: "https://assets.dapdap.net/monad/AIRMF.jpg"
  },
  alert: {
    address: "0xe23b434cfec8371ca77883a0319b8f391c699f7e",
    chainId: CHAIN_ID,
    symbol: "ALERT",
    decimals: 18,
    name: "AI Alert Shitcoin",
    icon: "https://assets.dapdap.net/monad/ALERT.jpg"
  },
  amad2002: {
    address: "0xf0f11ad595adeeb7c7526c363d2583ec9d078fb2",
    chainId: CHAIN_ID,
    symbol: "AMAD2002",
    decimals: 18,
    name: "Amad The Footballer",
    icon: "https://assets.dapdap.net/monad/AMAD2002.jpg"
  },
  amen: {
    address: "0x002d184fc500cf7aa12473ab91b84bea5f1cd011",
    chainId: CHAIN_ID,
    symbol: "AMEN",
    decimals: 18,
    name: "Amen Thuggs",
    icon: "https://assets.dapdap.net/monad/AMEN.jpg"
  },
  amesae: {
    address: "0xa930b1d96a02bb8e13d014e6f866cd182aae74ee",
    chainId: CHAIN_ID,
    symbol: "AMESAE",
    decimals: 18,
    name: "Amen Thuggs",
    icon: "https://assets.dapdap.net/monad/AMESAE.jpg"
  },
  anago: {
    address: "0x1c9e95a65c0467f56ed2e1afe5a3d62170a8e1f2",
    chainId: CHAIN_ID,
    symbol: "ANAGO",
    decimals: 18,
    name: "ANAGO",
    icon: "https://assets.dapdap.net/monad/ANAGO.jpg"
  },
  Anago: {
    address: "0xfe614e49f5a0d99d6cb001d2294feb958a7e7f85",
    chainId: CHAIN_ID,
    symbol: "ANAGO",
    decimals: 18,
    name: "Anago",
    icon: "https://assets.dapdap.net/monad/anago.png"
  },
  barqboy: {
    address: "0x7fb090417ff25b81283d83a35d512bedd856e0da",
    chainId: CHAIN_ID,
    symbol: "BARQBOY",
    decimals: 18,
    name: "Baroque Bach Boy",
    icon: "https://assets.dapdap.net/monad/barqboy.jpg"
  },
  bbarnold: {
    address: "0x54b9c3e4c02706b2c7628bdd6a300f18e1a0c78b",
    chainId: CHAIN_ID,
    symbol: "BBARNOLD",
    decimals: 18,
    name: "Benedict Betrayal",
    icon: "https://assets.dapdap.net/monad/BBARNOLD.jpg"
  },
  bdh: {
    address: "0x03c7377584174e5c820c1eacc6806270ae4fa8be",
    chainId: CHAIN_ID,
    symbol: "BDH",
    decimals: 18,
    name: "Bryce Dallas Howard",
    icon: "https://assets.dapdap.net/monad/BDH.jpg"
  },
  bjg: {
    address: "0x2fca7ea4d83cf6f0f61c485f40f898ef04f6dac0",
    chainId: CHAIN_ID,
    symbol: "BJG",
    decimals: 18,
    name: "Blind Jeopardy Guess",
    icon: "https://assets.dapdap.net/monad/BJG.jpg"
  },
  blast: {
    address: "0x068c352eb0a5b8a360e22f88bc62c1bd93e76f43",
    chainId: CHAIN_ID,
    symbol: "BLAST",
    decimals: 18,
    name: "Bowen Blast",
    icon: "https://assets.dapdap.net/monad/BLAST.jpg"
  },
  bnat: {
    address: "0x7c41cd77b8c9f06d85292de2707717699db8f07a",
    chainId: CHAIN_ID,
    symbol: "BNAT",
    decimals: 18,
    name: "Benedict Arnold Betrayal",
    icon: "https://assets.dapdap.net/monad/BNAT.jpg"
  },
  brosmer: {
    address: "0xd40a1803ad862141b4b323d7cbae514a1d48da46",
    chainId: CHAIN_ID,
    symbol: "BROSMER",
    decimals: 18,
    name: "Brosmer Puck Pusher",
    icon: "https://assets.dapdap.net/monad/BROSMER.jpg"
  },
  brt: {
    address: "0x48ec1fb8058f391d4c265c7c1dd6190ddda9cd34",
    chainId: CHAIN_ID,
    symbol: "BRT",
    decimals: 18,
    name: "Brosmer Time",
    icon: "https://assets.dapdap.net/monad/BRT.jpg"
  },
  bshc: {
    address: "0xa07de2a114acacd4e7938a0507431fe8541d7da4",
    chainId: CHAIN_ID,
    symbol: "BSHC",
    decimals: 18,
    name: "Blender Shitcoin",
    icon: "https://assets.dapdap.net/monad/BSHC.jpg"
  },
  buckwild: {
    address: "0x07ce7dfcd40ee8858f41c298df4a442c3fb544d4",
    chainId: CHAIN_ID,
    symbol: "BUCKWILD",
    decimals: 18,
    name: "Buck Wildn",
    icon: "https://assets.dapdap.net/monad/BUCKWILD.jpg"
  },
  bzn: {
    address: "0xac837c10e2a934aab4b4927d479af933010778e2",
    chainId: CHAIN_ID,
    symbol: "BZN",
    decimals: 18,
    name: "BERZAN",
    icon: "https://assets.dapdap.net/monad/BZN.jpg"
  },
  carr: {
    address: "0xc208b1bd52cf68a359add7de6f94cd5487bb672f",
    chainId: CHAIN_ID,
    symbol: "CARR",
    decimals: 18,
    name: "Carrs Commentary",
    icon: "https://assets.dapdap.net/monad/CARR.jpg"
  },
  case: {
    address: "0x9d6e8445620e9de39195dfc50f5ef215249aa9ef",
    chainId: CHAIN_ID,
    symbol: "CASE",
    decimals: 18,
    name: "Casemiro The Tackler",
    icon: "https://assets.dapdap.net/monad/CASE.jpg"
  },
  chaser: {
    address: "0x4e509927434ead2a1551a580675a7d398245be50",
    chainId: CHAIN_ID,
    symbol: "CHASER",
    decimals: 18,
    name: "Channel Chasers",
    icon: "https://assets.dapdap.net/monad/CHASER.jpg"
  },
  chog: {
    address: "0x5c57ea406ff244f0982e2dec5ab3fc20f7d42cf0",
    chainId: CHAIN_ID,
    symbol: "CHOG",
    decimals: 18,
    name: "Chog",
    icon: "https://assets.dapdap.net/monad/CHOG.jpg"
  },
  chop: {
    address: "0x82081ed8b08376a489a7e7dc74d78c74167ae575",
    chainId: CHAIN_ID,
    symbol: "CHOP",
    decimals: 18,
    name: "Chop",
    icon: "https://assets.dapdap.net/monad/CHOP.jpg"
  },
  ckcf: {
    address: "0x11ac322e3b59f796fd78f1276b5494df90776a10",
    chainId: CHAIN_ID,
    symbol: "CKCF",
    decimals: 18,
    name: "Carr mental health",
    icon: "https://assets.dapdap.net/monad/CKCF.jpg"
  },
  classic: {
    address: "0x5097e7da22c40716ab87757e3b14b04994c8073d",
    chainId: CHAIN_ID,
    symbol: "CLASSIC",
    decimals: 18,
    name: "Classic Token",
    icon: "https://assets.dapdap.net/monad/CLASSIC.jpg"
  },
  clbrq: {
    address: "0x6fa4bafda5881f7ef1c62e89c783159a996dbe40",
    chainId: CHAIN_ID,
    symbol: "CLBRQ",
    decimals: 18,
    name: "Claudio Baroque",
    icon: "https://assets.dapdap.net/monad/CLBRQ.jpg"
  },
  cnlf: {
    address: "0x0653cb95631940fb7b415140196d5fc6ffdc39b3",
    chainId: CHAIN_ID,
    symbol: "CNLF",
    decimals: 18,
    name: "Canales Traffic",
    icon: "https://assets.dapdap.net/monad/CNLF.jpg"
  },
  coolg: {
    address: "0x56bea55133cf1ef0aac5d90c37c37f591917998b",
    chainId: CHAIN_ID,
    symbol: "COOLG",
    decimals: 18,
    name: "Cooley GOAT",
    icon: "https://assets.dapdap.net/monad/COOLG.jpg"
  },
  kittle: {
    address: "0x11eca3b5a9d51e6aabf84fc4f4dfa17ac70edd5b",
    chainId: CHAIN_ID,
    symbol: "KITTLE",
    decimals: 18,
    name: "49ers Kittle",
    icon: "https://assets.dapdap.net/monad/KITTLE.jpg"
  },
  sqlan: {
    address: "0xbac7ff76154bc39b14c8f74c17e9f3dded504346",
    chainId: CHAIN_ID,
    symbol: "SQLAN",
    decimals: 18,
    name: "Check Analyze SQL",
    icon: "https://assets.dapdap.net/monad/SQLAN.jpg"
  },
  threet: {
    address: "0x4e4d993efa14a6757125697c96b3ce8d534f54d7",
    chainId: CHAIN_ID,
    symbol: "THREET",
    decimals: 18,
    name: "3 Ints",
    icon: "https://assets.dapdap.net/monad/THREET.jpg"
  },
  // lvusd: {
  //   address: "0xfd44b35139ae53fff7d8f2a9869c503d987f00d1",
  //   chainId: CHAIN_ID,
  //   symbol: "LVUSD",
  //   decimals: 6,
  //   name: "LVUSD",
  //   icon: "https://assets.dapdap.net/monad/lvusd.png"
  // },
  // subtc: {
  //   address: "0xe85411c030fb32a9d8b14bbbc6cb19417391f711",
  //   chainId: CHAIN_ID,
  //   symbol: "suBTC",
  //   decimals: 8,
  //   name: "suBTC",
  //   icon: "https://assets.dapdap.net/monad/subtc.png"
  // },
  // pufeth: {
  //   address: "0x37d6382b6889ccef8d6871a8b60e667115eddbcf",
  //   chainId: CHAIN_ID,
  //   symbol: "pufETH",
  //   decimals: 18,
  //   name: "pufETH",
  //   icon: "https://assets.dapdap.net/monad/pufeth.png"
  // },
  // pingu: {
  //   address: "0xa2426cd97583939e79cfc12ac6e9121e37d0904d",
  //   chainId: CHAIN_ID,
  //   symbol: "PINGU",
  //   decimals: 18,
  //   name: "PINGU",
  //   icon: "https://assets.dapdap.net/monad/pingu.png"
  // },
  // huhu: {
  //   address: "0xD8b8d868e994df5D4Ba8bD599eadBc21598a732E",
  //   chainId: CHAIN_ID,
  //   symbol: "HUHU",
  //   decimals: 18,
  //   name: "HUHU",
  //   icon: "https://assets.dapdap.net/monad/huhu.png"
  // }
}