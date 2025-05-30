import Big from "big.js";

export function balanceFormated(balance?: string | number, digits = 4) {
  if (!balance) return "0";
  const _balance = new Big(balance);
  if (_balance.eq(0)) return "0";
  if (_balance.lt(1 / 10 ** digits))
    return `<${Big(1)
      .div(10 ** digits)
      .toFixed(digits)}`;
  return _balance.toFixed(digits).replace(/\.?0+$/, "");
}

export function balanceFormatedFloor(balance?: string | number, digits = 4) {
  if (!balance) return "0";
  const _balance = new Big(balance);
  if (_balance.eq(0)) return "0";
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return _balance.toFixed(digits, 0);
}

export function valueFormated(balance?: string, price?: string, digits = 2) {
  if (!balance || !price) return "0";
  const _balance = new Big(balance);
  const _price = new Big(price);
  if (_balance.eq(0) || _price.eq(0)) return "0";
  const total = _balance.mul(_price);
  if (total.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  return total.toFixed(digits).replace(/\.?0+$/, "");
}

export function balanceShortFormated(balance?: string | number, digits = 1) {
  if (!balance) return "0";
  const _balance = new Big(balance);
  if (_balance.eq(0)) return "0";
  if (_balance.lt(1 / 10 ** digits)) return `<${1 / 10 ** digits}`;
  if (_balance.lt(1e3)) return _balance.toFixed(digits);
  if (_balance.lt(1e6)) return _balance.div(1e3).toFixed(digits) + "K";
  return _balance.div(1e6).toFixed(digits) + "M";
}

export function percentFormated(
  value: string | number,
  needMul = false
): string {
  return (Number(value) * (needMul ? 100 : 1)).toFixed(2) + "%";
}

const addressReg = /(\w{5})(.*)(\w{5})/;
export function addressFormated(address: string) {
  if (!address) {
    return "";
  }
  return address.replace(
    addressReg,
    (_1: string, _2: string, _3: string, _4: string) => {
      return `${_2}...${_4}`;
    }
  );
}

export function timeDurationFormated(time: number) {
  return Math.floor((Date.now() - time) / 1000 / 60) + " min ago";
}

export function errorFormated(error: any) {
  if (error.toString().indexOf("user rejected transaction") > -1) {
    return "user rejected transaction";
  }

  return error.title || error.message;
}

export function getFullNum(value: any) {
  try {
    let x = value;
    if (Math.abs(x) < 1.0) {
      const e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      let e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  } catch (e) {}

  return value;
}

export function formatPrice(price: number) {
  if (!price || isNaN(price)) return "";
  let digits = 0;
  if (Big(price).gt(10000)) digits = 1;
  if (Big(price).gt(100) && Big(price).lt(9999)) digits = 2;
  if (Big(price).gt(10) && Big(price).lt(99)) digits = 3;
  if (Big(price).gt(1) && Big(price).lt(10)) digits = 4;
  if (digits === 0) digits = 7;
  return balanceFormated(price, digits);
}

export const simplifyNumber = function (number: number, decimal: number) {
  if (typeof Number(number) !== "number") return 0;
  if (isNaN(Number(number))) return 0;
  if (number >= 1e3 && number < 1e6) {
    return Big(number / 1e3).toFixed(decimal) + "k";
  } else if (number >= 1e6 && number < 1e9) {
    return Big(number / 1e6).toFixed(decimal) + "m";
  } else if (number >= 1e9) {
    return Big(number / 1e9).toFixed(decimal) + "b";
  } else {
    return Big(number).toFixed(decimal);
  }
};
export function formatThousandsSeparator(
  n: number | string,
  precision?: number
): string {
  if (isNaN(Number(n))) return "";
  const strSplit = n.toString().split(".");
  const integer = strSplit[0].split("");
  integer.reverse();
  const decimal = strSplit[1];
  const newInteger = [];
  for (let i = 0; i < integer.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newInteger.push(",");
    }
    newInteger.push(integer[i]);
  }
  newInteger.reverse();
  let s = newInteger.join("");
  if (decimal) {
    if (typeof precision === "number") {
      const fixedDecimal = Big(`0.${decimal}`)
        .toFixed(precision, 0)
        .replace(/^\d/, "");
      return s + fixedDecimal;
    }
    s += `.${decimal}`;
  }
  return s;
}
export const formatValueDecimal = function (
  value: any,
  unit = "",
  decimal = 0,
  simplify = false,
  showLine = true
) {
  const target = Big(1).div(Math.pow(10, decimal));
  if (isNaN(value) || value === "" || Big(value ?? 0).eq(0)) {
    if (showLine) {
      return "-";
    } else {
      return unit + Big(0).toFixed(decimal);
    }
  } else if (Big(value).gt(0)) {
    if (Big(value).lt(target)) {
      return `<${unit}${target}`;
    } else {
      return (
        unit +
        (simplify
          ? simplifyNumber(value, decimal)
          : Big(value).toFixed(decimal))
      );
    }
  } else {
    return (
      unit +
      (simplify ? simplifyNumber(value, decimal) : Big(value).toFixed(decimal))
    );
  }
};
