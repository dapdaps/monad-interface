import { post } from "@/utils/http";

export default async function reportGameRecord(hash: string) {
  return post('/game/record', {
    tx_hash: hash
  });
};


