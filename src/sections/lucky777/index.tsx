"use client"
import React, { useState } from 'react';
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
    monadverse,
    monadoo,
    slmn,
    prizes,
  } = useLuckyBera();
  const { visible, toggleVisible } = useBuyHoney();
  const [update, setUpdate] = useState<any>(1);

  return (
    <Tiger
      key={update}
      spinUserData={spinUserData}
      lastSpinResult={lastSpinResult}
      getSpinUserData={getSpinUserData}
      handleSpinResult={handleSpinResult}
      toggleOutHoneyVisible={toggleVisible}
      multiple={multiple}
      setMultiple={setMultiple}
      chogStarrr={chogStarrr}
      monadverse={monadverse}
      monadoo={monadoo}
      slmn={slmn}
      prizes={prizes}
      onUpdate={() => setUpdate(update + 1)}
    />
  );
};

export default LuckyBeraView;


