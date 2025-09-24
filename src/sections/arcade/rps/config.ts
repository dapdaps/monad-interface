import { DEFAULT_CHAIN_ID } from "@/configs";
import { monadTestnet } from "viem/chains";

export const MONAD_EXPLORER_URL = DEFAULT_CHAIN_ID === monadTestnet.id ? monadTestnet.blockExplorers.default.url : monadTestnet.blockExplorers.default.url;

export enum RPSMove {
  Rock = 1,
  Scissors = 2,
  Paper = 3,
}

export const RPS_MOVES_ROUND = 3;
export const RPS_TIMEOUT_DURATION = 86400; // timeoutDuration: 24h
export const RPS_MIN_BET_AMOUNT = 1; // minBetAmount

export interface IRPSMove {
  value: RPSMove;
  label: string;
  icon: string;
}

export const RPSMoves: Record<RPSMove, IRPSMove> = {
  [RPSMove.Rock]: {
    value: RPSMove.Rock,
    label: "Rock",
    icon: "https://static.monad.xyz/rock.png",
  },
  [RPSMove.Scissors]: {
    value: RPSMove.Scissors,
    label: "Scissors",
    icon: "https://static.monad.xyz/scissors.png",
  },
  [RPSMove.Paper]: {
    value: RPSMove.Paper,
    label: "Paper",
    icon: "https://static.monad.xyz/paper.png",
  },
};

export enum RPSStatus {
  Ongoing = 1,
  Joined = 2,
  Won = 3,
  Canceled = 4,
}

export enum RPSWinner {
  Creator = 1,
  Palyer = 2,
  Draw = 3,
}

export interface Room {
  address: string;
  bet_amount: number;
  create_time: number;
  create_tx_hash: string;
  moves_hash: string;
  room_id: number;
}

export interface RPSRecord {
  address: string;
  bet_amount: number;
  create_time: number;
  create_tx_hash: string;
  end_tx_hash: string;
  join_tx_hash: string;
  moves: RPSMove[];
  moves_hash: string;
  player_address: string;
  player_moves: RPSMove[];
  player_moves_hash: string;
  player_salt: string;
  room_id: number;
  salt: string;
}
