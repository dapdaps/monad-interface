"use client"
import React from 'react';
import Entry from './components/entery';
import GamePrivyProvider from '@/components/privy-provider';

const Game: React.FC<any> = () => {
  return (
    <div className="w-full h-full md:h-[100dvh] overflow-y-auto scrollbar-hide relative">
      <GamePrivyProvider>
        <Entry />
      </GamePrivyProvider>
    </div>
  );
};

export default Game;


