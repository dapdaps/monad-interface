export enum RPSMove {
  Rock = 1,
  Scissors = 2,
  Paper = 3,
}

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
