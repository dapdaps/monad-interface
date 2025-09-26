"use client"
import React from 'react';
import Entry from './components/entery';

const Game: React.FC<any> = () => {
  return (
    <div className="w-full h-full md:h-[100dvh] overflow-y-auto scrollbar-hide relative">
      <Entry />
    </div>
  );
};

export default Game;


