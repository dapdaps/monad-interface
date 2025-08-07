export const GAME_CONTRACT_ADDRESS = "0xA55DfF58C456e0bBEaF5088bD25BF7E404C86186";
export const GAME_ADMIN_ADDRESS = "0xC5813B10E363F8264085391383664776f9931444";

export const NFT_AVATARS: any = {
  "0x9eca361b21b8fcf47566aa19888b013b9d9fe386": "/images/arcade/space-invaders/nfts/SpaceInvaders.png",
};

export const AMOUNT_OPTIONS = [
  {
    value: "0.1",
    label: "0.1",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "10",
    label: "10",
  },
];

export enum LayerStatus {
  Succeed,
  Failed,
  Locked,
  Unlocked,
}

export interface LayerRow {
  deathTileIndex?: number;
  multiplier: string;
  tiles: 2;

  // frontend only
  gameId: number;
  status: LayerStatus;
}

export interface Layer {
  id: number;
  rows: LayerRow[];
}

export enum LastGameStatus {
  Ongoing,
  Win,
  Lose,
}

export const LastGameStatusMap: Record<LastGameStatus, string> = {
  [LastGameStatus.Ongoing]: "Ongoing",
  [LastGameStatus.Win]: "Won",
  [LastGameStatus.Lose]: "Loss",
};

export interface LastGame {
  algo_variant: string;
  bet_amount: number;
  create_hash: string;
  current_row_index: number;
  end_hash: string;
  final_multiplier: number;
  game_id: string;
  rows: LayerRow[];
  seed: string;
  seed_hash: string;
  selected_tiles: number[];
  status: LastGameStatus;
  reward?: NFTItem;
}

export interface OpenTileRes {
  currentRow: LayerRow;
  currentRowIndex: number;
  finalMultiplier: number;
  isDeathTile: boolean;
  nextRow: LayerRow;
  status: number;
}

export interface StartGameRes {
  algo_variant: string;
  deadline: number;
  game_config: string;
  game_id: string;
  seed_hash: string;
  signature: string;
  reward?: NFTItem;

  status?: LastGameStatus;
  create_hash?: string;
  gameChainId?: string;
  selected_tiles?: number[];
  seed?: string;
}

export interface EndGameRes {
  chain_game_id: string;
  deadline: number;
  game_state: string;
  reward_amount: string;
  seed: string;
  signature: string;
}

export interface NFTItem {
  token_address: string;
  category: string;
  total: number;
  multiplier: string;
  remaining: number;
}

export enum SoundEffectType {
  Cashout = "cashout",
  Open = "open",
  Death = "death",
  ShuffleGates = "shuffle-gates",
  Start = "start",
}
