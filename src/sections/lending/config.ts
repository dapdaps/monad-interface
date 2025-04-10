export enum LendingActionType {
  Lend = 'deposit',
  Withdraw = 'withdraw',
  Borrow = 'borrow',
  Repay = 'repay',
  Claim = 'claim',
}

export interface LendingAction {
  value: string;
  label: string;
  labelAlias?: string;
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
    labelAlias: 'Close',
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
  [LendingActionType.Claim]: {
    value: LendingActionType.Claim,
    label: 'Claim',
    icon: '/images/lending/icon-up.png',
  },
};

export enum LendingAmountChangeType {
  Input,
  Balance,
}

export interface LendingAmountChangeParams {
  type?: LendingAmountChangeType;
  value: string;
}

export enum LendingOrderDirection {
  Asc,
  Desc,
}
