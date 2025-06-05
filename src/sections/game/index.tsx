"use client"
import React from 'react';
import Entry from './components/entery';
import GamePrivyProvider from '@/components/privy-provider';

const Game: React.FC<any> = () => {
  return (
    <GamePrivyProvider>
      <Entry />
    </GamePrivyProvider>
  );
};

export default Game;


