import dayjs from 'dayjs';

export const START_DATE = dayjs.utc("2025-02-19 00:00:00");

export const FE_SYSTEM_KEY = "FE_SYSTEM";
export const VERSION = "0.1";

export const FE_SYSTEM = {
  role: "SYSTEM",
  name: "SYSTEM",
};

export const LEVELS = {
  "Peasant": {
    value: "✦",
    name: "Peasant",
    condition: "Hold <10 MON",
  },
  "Worker": {
    value: "✧",
    name: "Worker",
    condition: "Hold 10-50 MON",
  },
  "Middle class": {
    value: "✬",
    name: "Middle class",
    condition: "Hold 50-100 MON",
  },
  "Business": {
    value: "✭",
    name: "Business",
    condition: "Hold 100-1000 MON",
  },
  "Wealthy": {
    value: "۞",
    name: "Wealthy",
    condition: "Hold >1000 MON",
  },
  "NGMI": {
    value: "✻",
    name: "NGMI",
    condition: "Have <5 txns on testnet",
  },
  "Lazy": {
    value: "✾",
    name: "Lazy",
    condition: "Have 5-20 txns on testnet",
  },
  "Standard": {
    value: "✿",
    name: "Standard",
    condition: "Have 20-100 txns on testnet",
  },
  "Hardwork": {
    value: "❀",
    name: "Hardwork",
    condition: "Have 100-500 txns on testnet",
  },
  "Certified": {
    value: "❂",
    name: "Certified",
    condition: "Have >500 txns on testnet",
  },
};
