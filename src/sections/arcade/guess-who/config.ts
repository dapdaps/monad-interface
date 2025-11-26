export enum Monster {
  Eye1 = 0,
  Eye2 = 1,
  Eye3 = 2,
}

export const MONSTERS: Record<Monster, { name: string, avatar: string, value: Monster; img: string; outline: string; shadow: string; size: [number, number]; outlineSize: [number, number]; }> = {
  [Monster.Eye1]: {
    name: "Chog",
    avatar: "/images/mainnet/arcade/guess-who/v2/nft-chog-sm.png",
    img: "/images/mainnet/arcade/guess-who/v2/nft-chog.png",
    outline: "/images/mainnet/arcade/guess-who/v2/nft-chog-outline.png",
    shadow: "/images/mainnet/arcade/guess-who/v2/nft-chog-shadow.png",
    size: [95, 91],
    outlineSize: [101, 97],
    value: Monster.Eye1,
  },
  [Monster.Eye2]: {
    name: "Molandak",
    avatar: "/images/mainnet/arcade/guess-who/v2/nft-molandak-sm.png",
    img: "/images/mainnet/arcade/guess-who/v2/nft-molandak.png",
    outline: "/images/mainnet/arcade/guess-who/v2/nft-molandak-outline.png",
    shadow: "/images/mainnet/arcade/guess-who/v2/nft-molandak-shadow.png",
    size: [87, 75],
    outlineSize: [93, 81],
    value: Monster.Eye2,
  },
  [Monster.Eye3]: {
    name: "Salmonad",
    avatar: "/images/mainnet/arcade/guess-who/v2/nft-salmonad-sm.png",
    img: "/images/mainnet/arcade/guess-who/v2/nft-salmonad.png",
    outline: "/images/mainnet/arcade/guess-who/v2/nft-salmonad-outline.png",
    shadow: "/images/mainnet/arcade/guess-who/v2/nft-salmonad-shadow.png",
    size: [91, 93],
    outlineSize: [97, 99],
    value: Monster.Eye3,
  },
};

export const RPS_MIN_BET_AMOUNT = 50; // minBetAmount

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

export const StatusMap: Record<Status, { name: string; color: string; name2: string; }> = {
  [Status.Ongoing]: {
    name: "Waiting...",
    name2: "Waiting...",
    color: "#7EA82B",
  },
  [Status.Joined]: {
    name: "Waiting...",
    name2: "Waiting...",
    color: "#7EA82B",
  },
  [Status.Won]: {
    name: "Winner",
    name2: "Ended",
    color: "#000",
  },
  [Status.Canceled]: {
    name: "Closed",
    name2: "Closed",
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

export enum HistoryAction {
  Create = "rpsCreate",
  Join = "rpsJoin",
  Refund = "rpsCancel",
  Won = "rpsPayOut",
}

export const HistoryActionMap: Record<HistoryAction, { name: string; isIncome?: boolean; }> = {
  [HistoryAction.Create]: {
    name: "Create room",
  },
  [HistoryAction.Join]: {
    name: "Play",
  },
  [HistoryAction.Refund]: {
    name: "Refund",
    isIncome: true,
  },
  [HistoryAction.Won]: {
    name: "Cash out",
    isIncome: true,
  },
};

// -10%
export const ClaimRefundFee = 0;
