export enum Monster {
  Eye1 = 0,
  Eye2 = 1,
  Eye3 = 2,
}

export const MONSTERS: Record<Monster, { name: string, avatar: string, value: Monster; }> = {
  [Monster.Eye1]: {
    name: "One Eye",
    avatar: "/images/mainnet/arcade/guess-who/avatar-monster-eye-1.png",
    value: Monster.Eye1,
  },
  [Monster.Eye2]: {
    name: "Two Eyes",
    avatar: "/images/mainnet/arcade/guess-who/avatar-monster-eye-2.png",
    value: Monster.Eye2,
  },
  [Monster.Eye3]: {
    name: "Three Eyes",
    avatar: "/images/mainnet/arcade/guess-who/avatar-monster-eye-3.png",
    value: Monster.Eye3,
  },
};

export const RPS_MIN_BET_AMOUNT = 1; // minBetAmount

export interface Player {
  address: string;
  moves: Monster;
  tx_hash: string;
  tx_time: number;
}

export enum Status {
  Ongoing = 1,
  Joined = 2,
  Won = 3,
  Canceled = 4,
}

export const StatusMap: Record<Status, { name: string; color: string; }> = {
  [Status.Ongoing]: {
    name: "Waiting...",
    color: "#7EA82B",
  },
  [Status.Joined]: {
    name: "Waiting...",
    color: "#7EA82B",
  },
  [Status.Won]: {
    name: "Winner",
    color: "#000",
  },
  [Status.Canceled]: {
    name: "Closed",
    color: "#857B7B",
  },
};

export enum ContractStatus {
  // Open
  Ongoing = 1,
  // Closed
  Won = 2,
  // ReadyForAdminReveal
  ReadyForAdminReveal = 3,
  // PendingReveal
  Pending = 4,
}

export const ContractStatus2Status: Record<ContractStatus, Status> = {
  [ContractStatus.Ongoing]: Status.Ongoing,
  [ContractStatus.Won]: Status.Won,
  [ContractStatus.ReadyForAdminReveal]: Status.Joined,
  [ContractStatus.Pending]: Status.Ongoing,
};

export enum WinnerStatus {
  WinnerPlayerA = 1,
  WinnerPlayerB = 2,
  WinnerPlayerC = 3,
  UnusedRoomClosed = 4,
}

export interface Room {
  address: string;
  room_id: number;
  bet_amount: string;
  create_tx_hash: string;
  end_tx_hash: string;
  create_time: number;
  status: Status;
  winner_address: string;
  winner_moves: Monster;
  players: Player[];
}

export const PlayerAvatars: Record<string, string> = {
  "0": "/images/mainnet/arcade/guess-who/avatar-user-1.png",
  "1": "/images/mainnet/arcade/guess-who/avatar-user-2.png",
  "2": "/images/mainnet/arcade/guess-who/avatar-user-3.png",
  "3": "/images/mainnet/arcade/guess-who/avatar-user-4.png",
  "4": "/images/mainnet/arcade/guess-who/avatar-user-5.png",
  "5": "/images/mainnet/arcade/guess-who/avatar-user-6.png",
  "6": "/images/mainnet/arcade/guess-who/avatar-user-7.png",
  "7": "/images/mainnet/arcade/guess-who/avatar-user-8.png",
};

export const EmptyPlayer = "0x0000000000000000000000000000000000000000";
