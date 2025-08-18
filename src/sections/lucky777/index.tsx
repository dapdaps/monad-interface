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
    monadoon,
    slmnd,
    lamouch,
    overnads,
    deadnads,
    coronad,
    prizes,
    prizeStatus,
    isOpenSwitch,
    setIsOpenSwitch,
    spinUserDataLoading,
  } = useLuckyBera();
  const { visible, toggleVisible } = useBuyHoney();
  const [update, setUpdate] = useState<any>(1); 

  return (
    <Tiger
      key={update}
      spinUserData={spinUserData}
      lastSpinResult={lastSpinResult}
      getSpinUserData={getSpinUserData}
      spinUserDataLoading={spinUserDataLoading}
      handleSpinResult={handleSpinResult}
      toggleOutHoneyVisible={toggleVisible}
      multiple={multiple}
      setMultiple={setMultiple}
      chogStarrr={chogStarrr}
      monadverse={monadverse}
      monadoon={monadoon}
      slmnd={slmnd}
      lamouch={lamouch}
      overnads={overnads}
      deadnads={deadnads}
      coronad={coronad}
      prizes={prizes}
      prizeStatus={prizeStatus}
      isOpenSwitch={isOpenSwitch}
      setIsOpenSwitch={setIsOpenSwitch}
      onUpdate={() => setUpdate(update + 1)}
    />
  );
};

export default LuckyBeraView;


