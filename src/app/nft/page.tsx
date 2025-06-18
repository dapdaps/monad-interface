'use client';
import NFT from '@/components/nft';
import Aboarding from '@/components/nft/Aboarding';
import TimeLocked from '@/components/time-locked';
import { useGuideStore } from '@/stores/guide';
import { useState } from 'react';

export default function NFTPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboardingOpen, setIsAboardingOpen] = useState(true);

  const {
    setVisitedIndex,
    getVisitedIndex,
    visible,
    setIsMint,
    setVisible,
    max,
    isMint
  } = useGuideStore();

  return (
    <div>
      <h1>NFT</h1>
      <TimeLocked cooldownTime={30000}>
        <button style={{ color: '#fff' }}>click</button>
      </TimeLocked>
      <NFT isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <Aboarding isOpen={isAboardingOpen} closeModal={() => setIsAboardingOpen(false)} getVisitedIndex={getVisitedIndex} setVisitedIndex={setVisitedIndex} isMint={isMint} />
    </div>
  );
}