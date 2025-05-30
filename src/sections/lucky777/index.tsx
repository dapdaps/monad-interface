"use client"
import React from 'react';
import Tiger from './components/tiger'
import { useLuckyBera } from '@/sections/lucky777/hooks';
import { useBuyHoney } from '@/sections/lucky777/hooks/buy-honey';
import { LoginContainer } from '@/sections/terminal/login';

const LuckyBeraView: React.FC<any> = () => {
  const {
    spinUserData,
    lastSpinResult,
    handleSpinResult,
    getSpinUserData,
    multiple,
    setMultiple,
  } = useLuckyBera();
  const { visible, toggleVisible } = useBuyHoney();

  console.log('spinUserData:', spinUserData); 
  console.log('lastSpinResult:', lastSpinResult);
  console.log('handleSpinResult:', handleSpinResult);

  return (
    <div className="w-full h-full  bg-no-repeat bg-cover bg-top">
      <LoginContainer>
        <Tiger
          spinUserData={spinUserData}
          lastSpinResult={lastSpinResult}
          getSpinUserData={getSpinUserData}
          handleSpinResult={handleSpinResult}
          toggleOutHoneyVisible={toggleVisible}
          multiple={multiple}
          setMultiple={setMultiple}
        />
      </LoginContainer>
    </div>
  );
};

export default LuckyBeraView;


