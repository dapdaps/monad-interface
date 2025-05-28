'use client';
import NFT from '@/components/nft';
import Aboarding from '@/components/nft/Aboarding';
import { useState } from 'react';

export default function NFTPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboardingOpen, setIsAboardingOpen] = useState(true);
  return (
    <div>
      <h1>NFT</h1>
      <NFT isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <Aboarding isOpen={isAboardingOpen} closeModal={() => setIsAboardingOpen(false)} />
    </div>
  );
}