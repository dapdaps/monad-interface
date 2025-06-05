'use client';
import { useState } from 'react';
import Game2048 from '@/sections/2048/main';
export default function Game2048Page() {

  return (
    <div>
      <h1>2048</h1>
      <Game2048 />
    </div>
  );
}