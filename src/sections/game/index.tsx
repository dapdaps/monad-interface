"use client"
import React from 'react';
import Entry from './components/mainnet-entery';
import Space from './components/space';
import Lucky777 from './components/lucky777';
import Sum from './components/sum';
import User from './components/user';

const Game: React.FC<any> = () => {
  return (
    <div className="w-full h-[100dvh] overflow-y-auto scrollbar-hide relative">
      <Entry />
      <Space />
      <Lucky777 />
      {/* <Sum /> */}
      <User />
    </div>
  );
};

export default Game;


