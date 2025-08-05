export const GAME_CONTRACT_ADDRESS = "0xA55DfF58C456e0bBEaF5088bD25BF7E404C86186";
export const GAME_ADMIN_ADDRESS = "0xC5813B10E363F8264085391383664776f9931444";

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

  status?: LastGameStatus;
  create_hash?: string;
  gameChainId?: string;
  selected_tiles?: number[];
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
  category: string;
  total: number;
  row_index: number;
  remaining: number;
}
