export enum LendingActionType {
  Lend = 'deposit',
  Withdraw = 'withdraw',
  Borrow = 'borrow',
  Repay = 'repay',
}

export interface LendingAction {
  value: string;
  label: string;
  icon: string;
}

export const LENDING_ACTION_TYPE_MAP: Record<LendingActionType, LendingAction> = {
  [LendingActionType.Lend]: {
    value: LendingActionType.Lend,
    label: 'Lend',
    icon: '/images/lending/icon-down.png',
  },
  [LendingActionType.Withdraw]: {
    value: LendingActionType.Withdraw,
    label: 'Withdraw',
    icon: '/images/lending/icon-up.png',
  },
  [LendingActionType.Borrow]: {
    value: LendingActionType.Borrow,
    label: 'Borrow',
    icon: '/images/lending/icon-up.png',
  },
  [LendingActionType.Repay]: {
    value: LendingActionType.Repay,
    label: 'Repay',
    icon: '/images/lending/icon-down.png',
  },
}
