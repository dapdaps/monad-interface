"use client"
import React from 'react';
import Entry from './components/mainnet-entery';
import Sum from './components/sum';
import User from './components/user';

const Game: React.FC<any> = () => {
  return (
    <div className="w-full h-[100dvh] overflow-hidden scrollbar-hide relative">
      <Entry />
      {/* <Sum /> */}
      <User />
    </div>
  );
};

export default Game;


