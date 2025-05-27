'use client';
import NFT from '@/components/nft';
import { useState } from 'react';

export default function NFTPage() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <h1>NFT</h1>
      <NFT isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </div>
  );
}