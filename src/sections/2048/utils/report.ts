import { post } from "@/utils/http";
import { getSignature } from "@/utils/signature";

export default async function reportGameRecord(hash: string, score: string, gameAddress: string) {
  const  ss = getSignature(
    `gameAddress=${gameAddress}&txHash=${hash}&score=${score}`
  );

  return post('/game/record/2048', {
    tx_hash: hash,
    ss,
    score,
    game_address: gameAddress
  });
};


