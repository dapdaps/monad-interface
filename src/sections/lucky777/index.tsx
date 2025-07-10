"use client"
import React from 'react';
import Tiger from './components/tiger'
import { useLuckyBera } from '@/sections/lucky777/hooks';
import { useBuyHoney } from '@/sections/lucky777/hooks/buy-honey';
import { LoginContainer } from '@/sections/terminal/login';
import GamePrivyProvider from '@/components/privy-provider';

const LuckyBeraView: React.FC<any> = () => {

  return (
    <div className="w-full h-full  bg-no-repeat bg-cover bg-top">
      <LoginContainer>
        <GamePrivyProvider>
          <TigerView />
        </GamePrivyProvider>
      </LoginContainer>
    </div>
  );
};

const TigerView: React.FC<any> = () => {
  const {
    spinUserData,
    lastSpinResult,
    handleSpinResult,
    getSpinUserData,
    multiple,
    setMultiple,
    chogStarrr,
  } = useLuckyBera();
  const { visible, toggleVisible } = useBuyHoney();

  return (
    <Tiger
      spinUserData={spinUserData}
      lastSpinResult={lastSpinResult}
      getSpinUserData={getSpinUserData}
      handleSpinResult={handleSpinResult}
      toggleOutHoneyVisible={toggleVisible}
      multiple={multiple}
      setMultiple={setMultiple}
      chogStarrr={chogStarrr}
    />
  );
};

export default LuckyBeraView;


