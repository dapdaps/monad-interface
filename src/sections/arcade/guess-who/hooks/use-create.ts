import { useState } from "react";
import { Monster } from "../config";

export function useCreate(props?: any) {
  const {
  } = props ?? {};

  const [betMonster, setBetMonster] = useState<Monster[]>([]);
  const [betAmount, setBetAmount] = useState<string>();

  const onSelectMonster = (monster: Monster) => {
    setBetMonster((prev) => {
      const _betMonster = [...prev];
      if (_betMonster.includes(monster)) {
        _betMonster.splice(_betMonster.indexOf(monster), 1);
      } else {
        _betMonster.push(monster);
        if (_betMonster.length > 2) {
          _betMonster.shift();
        }
      }
      return _betMonster;
    });
  };

  return {
    betMonster,
    onSelectMonster,
    setBetAmount,
    betAmount,
  };
}
