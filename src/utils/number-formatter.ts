import Big from 'big.js';

export const addThousandSeparator = (numberString: string) => {
  const parts = numberString.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1] ? `.${parts[1]}` : '';
  return integerPart + decimalPart;
}

export const numberFormatter = (
  value: string | number | Big.Big | undefined,
  precision: number,
  isSimple?: boolean,
  options?: {
    // resolve the issue of displaying values like $< 0.01
    // it should display as < $0.01
    prefix?: string;
    // when it is less than a certain value
    // 0 should be displayed in the integer part
    // not in the decimal part
    isLTIntegerZero?: boolean;
    // should zeros be added at the end
    isZeroPrecision?: boolean;
    isShort?: boolean;
    isShortUppercase?: boolean;
    round?: Big.RoundingMode;
    isLessPrecision?: boolean;
  }
): any => {
  const {
    prefix = '',
    isLTIntegerZero,
    isZeroPrecision,
    isShort,
    isShortUppercase,
    round = Big.roundHalfUp,
    isLessPrecision = true,
  } = options || {};

  const isValid = () => {
    try {
      if (!value) return false;
      Big(value);
      return true;
    } catch (err: any) {
      return false;
    }
  };

  if (!value || !isValid() || Big(value).eq(0)) {
    if (isSimple) {
      if (isZeroPrecision) {
        return `${prefix}${Big(0).toFixed(precision, round)}`;
      }
      return `${prefix}0`;
    }
    if (isZeroPrecision) {
      return {
        integer: `${prefix}0`,
        decimal: Big(0).toFixed(precision, round).replace(/^\d/, '')
      };
    }
    return {
      integer: `${prefix}0`,
      decimal: ''
    };
  }

  if (isLessPrecision && Big(value).lt(Big(10).pow(-precision))) {
    if (isSimple) {
      return `< ${prefix}${Big(10).pow(-precision).toFixed(precision, round)}`;
    }
    if (isLTIntegerZero) {
      return {
        integer: `< ${prefix}0`,
        decimal: Big(10).pow(-precision).toFixed(precision, round).replace(/^\d/, '')
      };
    }
    return {
      integer: '',
      decimal: `< ${prefix}${Big(10).pow(-precision).toFixed(precision, round)}`
    };
  }

  const finalValue = addThousandSeparator(Big(value).toFixed(precision, round));
  const firstPart = finalValue.split('.')[0];
  let secondPart = finalValue.split('.')[1] || '';
  if (secondPart) {
    secondPart = '.' + secondPart;
  }
  if (isSimple) {
    if (isShort) {
      const formatter = (split: number, unit: string): string => {
        let _num = Big(value)
          .div(split)
          .toFixed(precision, 0);
        if (!isZeroPrecision) {
          _num = _num.replace(/(?:\.0*|(\.\d+?)0+)$/, '$1');
        }
        const inter = _num.split('.')?.[0]?.replace(/\d(?=(\d{3})+\b)/g, '$&,');
        const decimal = _num.split('.')?.[1] ?? '';
        return `${prefix}${inter}${decimal ? '.' + decimal : ''}${unit}`;
      };
      // septillion
      // if (Big(value).gte(1e24)) {
      //   return formatter(1e24, 't');
      // }
      // sextillion
      // if (Big(value).gte(1e21)) {
      //   return formatter(1e21, 's');
      // }
      // quintillion
      // if (Big(value).gte(1e18)) {
      //   return formatter(1e18, 'r');
      // }
      // quadrillion
      // if (Big(value).gte(1e15)) {
      //   return formatter(1e15, 'q');
      // }
      // trillion
      if (Big(value).gte(1e12)) {
        return formatter(1e12, isShortUppercase ? 'T' : 't');
      }
      // billion
      if (Big(value).gte(1e9)) {
        return formatter(1e9, isShortUppercase ? 'B' : 'b');
      }
      // million
      if (Big(value).gte(1e6)) {
        return formatter(1e6, isShortUppercase ? 'M' : 'm');
      }
      // thousand
      if (Big(value).gte(1e3)) {
        return formatter(1e3, isShortUppercase ? 'K' : 'k');
      }
    }
    if (isZeroPrecision) {
      return `${prefix}${firstPart}${secondPart}`;
    }
    return `${prefix}${firstPart}${secondPart.replace(/[.]?0*$/, '')}`;
  }
  if (isZeroPrecision) {
    return {
      integer: `${prefix}${firstPart}`,
      decimal: secondPart
    };
  }
  return {
    integer: `${prefix}${firstPart}`,
    decimal: secondPart.replace(/[.]?0*$/, '')
  };
};

export const numberRemoveEndZero = (value: string) => {
  return value.replace("-", "").replace(/\.?0+$/, '');
};

export const formatSmallDecimal = (
  value: string | number | Big.Big | undefined,
  prefix: string = '',
  maxDecimalPlaces: number = 6 
): string => {
  if (!value) {
    return `${prefix}0`;
  }

  let bigValue: Big.Big;
  try {
    bigValue = Big(value);
  } catch {
    return `${prefix}0`;
  }

  if (bigValue.lte(0)) {
    return `${prefix}0`;
  }

  if (bigValue.gte(0.001)) {
    return `${prefix}${bigValue.toFixed(maxDecimalPlaces)}`;
  }

  const valueStr = bigValue.toFixed(20);
  const parts = valueStr.split('.');
  
  if (parts.length !== 2) {
    return `${prefix}${valueStr}`;
  }

  const decimalPart = parts[1];
  
  let zeroCount = 0;
  let significantStart = -1;
  
  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] === '0') {
      zeroCount++;
    } else {
      significantStart = i;
      break;
    }
  }

  if (significantStart === -1) {
    return `${prefix}0`;
  }

  let significantDigits = decimalPart.substring(significantStart).replace(/0+$/, '');

  if (significantDigits.length > maxDecimalPlaces) {
    significantDigits = significantDigits.substring(0, maxDecimalPlaces);
  }

  const subscriptMap: { [key: string]: string } = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉',
  };

  const toSubscript = (num: number): string => {
    return num.toString().split('').map(digit => subscriptMap[digit] || digit).join('');
  };

  if (zeroCount > 0) {
    const remainingZeros = zeroCount - 1;
    if (remainingZeros > 0) {
      const subscript = toSubscript(remainingZeros);
      return `${prefix}0.0${subscript}${significantDigits}`;
    } else {
      return `${prefix}0.0${significantDigits}`;
    }
  }

  return `${prefix}0.${significantDigits}`;
};
