'use client';
import NFT from '@/components/nft';

export default function NFTPage() {
  return (
    <div>
      <h1>NFT</h1>

      <NFT isOpen={true} closeModal={() => {}} />

    </div>
  );
}