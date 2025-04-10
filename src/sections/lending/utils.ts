import Big from 'big.js';

// (Documents)[https://wool-gouda-88a.notion.site/timeswap-1c14970e0e4d8022b8eed9f6ffa33d75]
export const calculateTimeSwapCollateral = (borrow: string, apr: string, transitionPrice: string, duration: number) => {
  // Calculation formula：Collateral = Borrow * (1 + APR * Duration) / Transition Price
  return Big(borrow).times(Big(1).plus(Big(apr || 0).times((duration || 1) / 365))).div(transitionPrice || 1);
};

// (Documents)[https://wool-gouda-88a.notion.site/timeswap-1c14970e0e4d8022b8eed9f6ffa33d75]
export const calculateTimeSwapBorrow = (collateral: string, apr: string, transitionPrice: string, duration: number) => {
  // Calculation formula：Borrow = (Collateral * Transition Price) / (1 + APR * Duration)
  return Big(collateral).times(transitionPrice || 1).div(Big(1).plus(Big(apr || 0).times((duration || 1) / 365)));
}
