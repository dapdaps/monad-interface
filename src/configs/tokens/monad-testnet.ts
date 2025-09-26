import type { Token } from "@/types";
import { monadTestnet } from "viem/chains";

const CHAIN_ID = monadTestnet.id;

export const monad: { [key: string]: Token } = {
  mon: {
    address: "native",
    isNative: true,
    chainId: CHAIN_ID,
    symbol: "MON",
    decimals: 18,
    name: "Testnet MON Token",
    icon: "/images/monad.svg",
    color: "#78350F"
  },
  eth: {
    chainId: CHAIN_ID,
    address: "0x836047a99e11F376522B447bffb6e3495Dd0637c",
    decimals: 18,
    symbol: "ETH",
    name: "ETH",
    icon: "/assets/tokens/eth.png",
    color: "#D2D2D2"
  },
  dak: {
    address: "0x0f0bdebf0f83cd1ee3974779bcb7315f9808c714",
    chainId: CHAIN_ID,
    symbol: "DAK",
    decimals: 18,
    name: "Testnet MON Token",
    icon: "/assets/tokens/dak.png",
    color: "#78350F"
  },
  yaki: {
    address: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50",
    chainId: CHAIN_ID,
    symbol: "YAKI",
    decimals: 18,
    name: "Moyaki",
    icon: "/assets/tokens/yaki.png",
    color: "#78350F"
  },
  chog: {
    address: "0xe0590015a873bf326bd645c3e1266d4db41c4e6b",
    chainId: CHAIN_ID,
    symbol: "CHOG",
    decimals: 18,
    name: "Chog",
    icon: "/assets/tokens/chog.png",
    color: "#78350F"
  },
  wmon: {
    address: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701",
    chainId: CHAIN_ID,
    symbol: "WMON",
    decimals: 18,
    name: "Wrapped Monad",
    icon: "/assets/tokens/wmon.png",
    color: "#78350F"
  },
  shmon: {
    address: "0x3a98250F98Dd388C211206983453837C8365BDc1",
    chainId: CHAIN_ID,
    symbol: "shMON",
    decimals: 18,
    name: "ShMonad",
    icon: "/assets/tokens/shmon.svg",
    color: "#5146e6"
  },
  usdc: {
    address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea",
    chainId: CHAIN_ID,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "/assets/tokens/usdc.png",
    color: "#78350F"
  },
  usdt: {
    address: "0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D",
    chainId: CHAIN_ID,
    symbol: "USDT",
    decimals: 6,
    name: "Tether USD",
    icon: "/assets/tokens/usdt.png",
    color: "#78350F"
  },
  weth: {
    address: "0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37",
    chainId: CHAIN_ID,
    symbol: "WETH",
    decimals: 18,
    name: "Wrapped ETH",
    icon: "/assets/tokens/weth.png",
    color: "#78350F"
  },
  wbtc: {
    address: "0xcf5a6076cfa32686c0Df13aBaDa2b40dec133F1d",
    chainId: CHAIN_ID,
    symbol: "WBTC",
    decimals: 8,
    name: "Wrapped BTC",
    icon: "/assets/tokens/wbtc.png",
    color: "#78350F"
  },
  wsol: {
    address: "0x5387C85A4965769f6B0Df430638a1388493486F1",
    chainId: CHAIN_ID,
    symbol: "WSOL",
    decimals: 9,
    name: "Wrapped SOL",
    icon: "/assets/tokens/wsol.avif",
    color: "#78350F"
  },
  dof: {
    address: "0x71292fAeD3bcC353207645F5b40d7836e566Bab7",
    chainId: CHAIN_ID,
    symbol: "DOF",
    decimals: 18,
    name: "Doge Face",
    icon: "/assets/tokens/dof.png",
    color: "#78350F"
  },
  b3m: {
    address: "0x276856DFEF72fA8b876Eb8Eb0Fe8b4B4778eC5E0",
    chainId: CHAIN_ID,
    symbol: "B3M",
    decimals: 18,
    name: "Baby3Monad",
    icon: "/assets/tokens/b3m.png",
    color: "#78350F"
  },
  dogfood: {
    address: "0xC188d44Ef48a7657697157Fd511B8f6Cc1a864D8",
    chainId: CHAIN_ID,
    symbol: "DOGFOOD",
    decimals: 18,
    name: "Anago's Dog Food",
    icon: "/assets/tokens/dogfood.png",
    color: "#78350F"
  },
  dump: {
    address: "0xAbd7AFA2161Eb7254c0a9DbB5fE79216B7c28e03",
    chainId: CHAIN_ID,
    symbol: "DUMP",
    decimals: 18,
    name: "Anago's Dump",
    icon: "/assets/tokens/dump.png"
  },
  axo: {
    address: "0x39e95286dD43f8Da34Cbda8e4B656Da9F53Ca644",
    chainId: CHAIN_ID,
    symbol: "AXO",
    decimals: 18,
    name: "Axolotl",
    icon: "/assets/tokens/axo.png"
  },
  bean: {
    address: "0x743Cef7Ccc8ac56605c8404607142e5B35EFA11D",
    chainId: CHAIN_ID,
    symbol: "BEAN",
    decimals: 18,
    name: "BEANAKO",
    icon: "/assets/tokens/bean.png"
  },
  bb: {
    address: "0x4c10428Ed0410dfb2de62fc007F7c1105aE861e9",
    chainId: CHAIN_ID,
    symbol: "BB",
    decimals: 18,
    name: "Blue Balls",
    icon: "/assets/tokens/bb.png"
  },
  q: {
    address: "0x2FA2C507289BE90ca50a8802F8d436d43001b521",
    chainId: CHAIN_ID,
    symbol: "Q",
    decimals: 18,
    name: "CLOB my quant",
    icon: "/assets/tokens/q.png"
  },
  chad: {
    address: "0x2BB4219b8e85C111613f3eE192a115676F230d35",
    chainId: CHAIN_ID,
    symbol: "CHAD",
    decimals: 18,
    name: "Clob Chad",
    icon: "/assets/tokens/chad.png"
  },
  melo: {
    address: "0x8507F576EB214d172012065d58cfb38a4540b0a6",
    chainId: CHAIN_ID,
    symbol: "MELO",
    decimals: 18,
    name: "DOG CARAMELO",
    icon: "/assets/tokens/melo.png"
  },
  jml: {
    address: "0x53abD7e17C8939558BFA80a721E01633A3ef9D5c",
    chainId: CHAIN_ID,
    symbol: "JML",
    decimals: 18,
    name: "JUMAPEL",
    icon: "/assets/tokens/jml.png"
  },
  jerry: {
    address: "0xdA054a96254776346386060C480B42A10C870Cd2",
    chainId: CHAIN_ID,
    symbol: "JERRY",
    decimals: 18,
    name: "Jerry",
    icon: "/assets/tokens/jerry.png"
  },
  monzilla: {
    address: "0xc89966dc43029904D5Fd86925F0d98607344F759",
    chainId: CHAIN_ID,
    symbol: "MONZILLA",
    decimals: 18,
    name: "MONZILLA & GRANNY",
    icon: "/assets/tokens/monzilla.png"
  },
  monka: {
    address: "0xfa47B094A9666422848F459B54daB88B0E8255e9",
    chainId: CHAIN_ID,
    symbol: "MONKA",
    decimals: 18,
    name: "MONKA GIGA",
    icon: "/assets/tokens/monka.png"
  },
  lbtc: {
    address: "0x73a58b73018c1a417534232529b57b99132b13D2",
    chainId: CHAIN_ID,
    symbol: "LBTC",
    decimals: 8,
    name: "Lombard Staked Bitcoin",
    icon: "/assets/tokens/lbtc.png"
  },
  kurt: {
    address: "0xcF285841D0DC4fedB1fd80f81440c1C7e961FC4e",
    chainId: CHAIN_ID,
    symbol: "KURT",
    decimals: 18,
    name: "Kurt Clobaine",
    icon: "/assets/tokens/kurt.png"
  },
  kb: {
    address: "0x34D1ae6076Aee4072F54e1156D2e507DD564a355",
    chainId: CHAIN_ID,
    symbol: "KB",
    decimals: 18,
    name: "Kryptobaby777",
    icon: "/assets/tokens/kb.webp"
  },
  kiwif: {
    address: "0x7E7ED7ba41834B00b1Fdc0848E237AFAa1e8D380",
    chainId: CHAIN_ID,
    symbol: "KIWIF",
    decimals: 18,
    name: "Kiwi Wif Hat",
    icon: "/assets/tokens/kiwif.png"
  },
  smon: {
    address: "0xe1d2439b75fb9746E7Bc6cB777Ae10AA7f7ef9c5",
    chainId: CHAIN_ID,
    symbol: "sMON",
    decimals: 18,
    name: "Kintsu Staked Monad",
    icon: "/assets/tokens/smon.webp"
  },
  fiabtc: {
    address: "0x859fb36f3Fe7e22b37dd99b501f891377DdC9c33",
    chainId: CHAIN_ID,
    symbol: "FIABTC",
    decimals: 8,
    name: "Fiamma BTC",
    icon: "/assets/tokens/fiabtc.webp"
  },
  gmon: {
    address: "0xaEef2f6B429Cb59C9B2D7bB2141ADa993E8571c3",
    chainId: monadTestnet.id,
    symbol: "gMON",
    decimals: 18,
    name: "gMON",
    icon: "/assets/tokens/gmon.png"
  },
};
