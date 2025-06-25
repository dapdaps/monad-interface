import { post } from "@/utils/http";
import { getSignature } from "@/utils/signature";
import { GAME_CONTRACT_ADDRESS } from "./constants";

export default async function reportGameRecord(hash: string, score: string) {
  const  ss = getSignature(
    `gameAddress=${GAME_CONTRACT_ADDRESS}txHash=${hash}&score=${score}`
  );

  return post('/game/record/2048', {
    tx_hash: hash,
    ss,
    score,
    gameAddress: GAME_CONTRACT_ADDRESS
  });
};


