import { AnimatePresence, motion, useAnimate, useMotionValue } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SPIN_CATEGORIES, SpinCategory } from '@/sections/lucky777/config';
import { numberFormatter } from '@/utils/number-formatter';
import { useRequestByToken } from '../hooks/use-request-by-token';
import BuyTimesModal from './buyTimes';
import useToast from '@/hooks/use-toast';
import Big from 'big.js';
import HistoryModal from './history';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCountDown, useInterval } from 'ahooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import RulesModal from './rules';
import { useSoundStore } from '@/stores/sound';
import Notice from './notice';
import NftT from './nftT';
import Switch from './switch';
import { sleep } from '@/sections/bridge/lib/util';
import Xp from './xp';
import Redeem from './redeem';
dayjs.extend(duration);

function getTimeLeftToUTC24() {
  const nowUtc = dayjs.utc();
  const nextUtcMidnight = nowUtc.startOf('day').add(1, 'day');
  const diff = nextUtcMidnight.diff(nowUtc);
  const _duration = dayjs.duration(diff);

  return {
    hours: Math.floor(_duration.asHours()) < 10 ? `0${Math.floor(_duration.asHours())}` : Math.floor(_duration.asHours()),
    minutes: _duration.minutes() < 10 ? `0${_duration.minutes()}` : _duration.minutes(),
    seconds: _duration.seconds() < 10 ? `0${_duration.seconds()}` : _duration.seconds()
  };
}

// const WHEEL_SIZE = 600;
const WHEEL_AREA = 120;
const WHEEL_ICON_SIZE = 65;
const SPIN_PROGRESS_BASE = 10; // percent
const EXPLOSION_COIN_SIZE = 100;

const TOTAL_SPINS = 50;

// const SpinCategories = Object.values(SPIN_CATEGORIES);
// const SpinCategoryRotation = WHEEL_AREA / SpinCategories.length;
const SpinBase = 10;

const WheelInfinityDelay = 0.3;
const WheelInfinitySlowDuration = 25;
const WheelInfinityAnimation: any = {
  duration: WheelInfinityDelay,
  ease: 'linear',
  repeat: Infinity,
};

const MAX_POINT = 10000;
const DEFAULT_TITLE = 'LUCKY 777';
const DEFAULT_UNLUCKY_TITLE = 'Better luck next time! Better luck next time!';

export default memo(function Tiger(props: any) {
  const {
    spinUserData,
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
    prizeStatus,
    isOpenSwitch,
    setIsOpenSwitch,
    spinUserDataLoading
  } = props;

  const [leftSpin, setLeftSpin] = useState(0);
  const [xpBalance, setXpBalance] = useState(0);
  const [xpLevel, setXpLevel] = useState(0);


  const [WHEEL_SIZE, setWHEEL_SIZE] = useState(Number(chogStarrr?.remaining) > 0 ? 600 : 500);
  const [SpinCategories, setSpinCategories] = useState(Object.values(SPIN_CATEGORIES));
  const [SpinCategoryRotation, setSpinCategoryRotation] = useState(WHEEL_AREA / SpinCategories.length);
  const [maxXp, setMaxXp] = useState(0);

  useEffect(() => {
    if (!prizeStatus || prizeStatus.length === 0) {
      return;
    }
    setWHEEL_SIZE(100 * prizeStatus.length);
    setSpinCategoryRotation(WHEEL_AREA / prizeStatus.length);
    setSpinCategories(Object.values(SPIN_CATEGORIES).filter((it) => prizeStatus.includes(Number(it.code))));

  }, [prizeStatus]);

  useEffect(() => {
    if (spinUserData) {
      setLeftSpin(spinUserData?.spin_balance);
      setXpBalance(spinUserData?.xp_balance);
      setXpLevel(spinUserData?.xp_level);
      setMaxXp(spinUserData?.game_xp?.xp);
    }
  }, [spinUserData]);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [openBuyTimes, setOpenBuyTimes] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const { fail, success } = useToast({ isGame: true });
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [freeTimes, setFreeTimes] = useState(getTimeLeftToUTC24());
  const [animateSpinning, setAnimateSpinning] = useState(false);
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);

  const soundStore = useSoundStore()

  const [leftWheel, leftWheelAnimate] = useAnimate();
  const leftWheelRotation = useMotionValue(-1);
  const [centerWheel, centerWheelAnimate] = useAnimate();
  const centerWheelRotation = useMotionValue(-1);
  const [rightWheel, rightWheelAnimate] = useAnimate();
  const rightWheelRotation = useMotionValue(-1);
  const spinRef = useRef<any>();
  const spinTimerInfinityLeft = useRef<any>();
  const spinTimerInfinityCenter = useRef<any>();
  const spinTimerInfinityRight = useRef<any>();
  const [disabledBtnSpin, setDisabledBtnSpin] = useState(false);
  const isOpenSwitchRef = useRef(isOpenSwitch);

  useInterval(() => {
    setFreeTimes(getTimeLeftToUTC24());
  }, 1000);

  const createCoin = (x: number, y: number, icon: string) => {
    const coin = document.createElement('div');
    // Set basic styles for coin element
    coin.style.position = 'fixed';
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;
    coin.style.width = `${EXPLOSION_COIN_SIZE}px`;
    coin.style.height = `${EXPLOSION_COIN_SIZE}px`;
    coin.style.backgroundImage = `url('${icon}')`;
    coin.style.backgroundSize = 'contain';
    coin.style.backgroundRepeat = 'no-repeat';
    coin.style.pointerEvents = 'none';
    coin.style.zIndex = '9999';
    coin.style.transformStyle = 'preserve-3d';
    coin.style.backfaceVisibility = 'visible';
    coin.style.opacity = '0';

    document.body.appendChild(coin);
    return coin;
  };

  const animateCoin = (coin: HTMLDivElement, startX: number, startY: number) => {
    const horizontalDistance = (Math.random() - 0.5) * 400;
    const maxHeight = -(Math.random() * 400 + 300);


    // Movement and rotation animation keyframes
    const moveKeyframes = [
      // Initial position
      {
        transform: 'translate(0, 50px) rotate(0deg)',
        offset: 0
      },
      // First rapid ascent phase
      {
        transform: `translate(${horizontalDistance * 0.2}px, ${maxHeight * 0.3}px) rotate(${Math.random() * 180}deg)`,
        offset: 0.15
      },
      // Second rapid ascent phase
      {
        transform: `translate(${horizontalDistance * 0.4}px, ${maxHeight * 0.7}px) rotate(${Math.random() * 360}deg)`,
        offset: 0.3
      },
      // Peak point
      {
        transform: `translate(${horizontalDistance * 0.6}px, ${maxHeight}px) rotate(${Math.random() * 540}deg)`,
        offset: 0.4
      },
      // Start slow descent
      {
        transform: `translate(${horizontalDistance * 0.8}px, ${maxHeight * 0.6}px) rotate(${Math.random() * 720}deg)`,
        offset: 0.7
      },
      // Accelerated descent
      {
        transform: `translate(${horizontalDistance}px, ${Math.abs(maxHeight)}px) rotate(${Math.random() * 1080}deg)`,
        offset: 1
      }
    ];

    // Opacity animation keyframes
    const opacityKeyframes = [
      { opacity: 0, offset: 0 },     // Initially invisible
      { opacity: 1, offset: 0.1 },  // Brief invisibility period
      { opacity: 1, offset: 0.2 },  // Quick fade in
      { opacity: 1, offset: 0.55 },  // Quick fade in
      { opacity: 0, offset: 0.8 },   // Maintain visibility
      { opacity: 0, offset: 1 }      // Fade out
    ];

    // Create animations with adjusted duration
    const moveAnimation = coin.animate(moveKeyframes, {
      duration: 4000,
      easing: 'cubic-bezier(0.2, 1, 0.3, 1)', // Adjusted easing for smoother motion
      fill: 'forwards'
    });

    const opacityAnimation = coin.animate(opacityKeyframes, {
      duration: 3000, // Match movement animation duration
      easing: 'linear',
      fill: 'forwards'
    });

    // Cleanup function to remove element when animations complete
    const removeElement = () => {
      if (moveAnimation.playState === 'finished' && opacityAnimation.playState === 'finished') {
        coin.remove();
      }
    };

    moveAnimation.onfinish = removeElement;
    opacityAnimation.onfinish = removeElement;
  };

  const createCoinsExplosion = (centerX: number, centerY: number, icon: string) => {
    const numberOfCoins = 4;
    const delayBetweenCoins = 100; // Delay between each coin's animation

    // Create multiple waves of coins with different delays and parameters
    const createWave = (delay: number, count: number) => {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          const coin = createCoin(centerX, centerY, icon);
          animateCoin(coin, centerX, centerY);
        }, i * delayBetweenCoins + delay);
      }
    };

    // Create waves with adjusted intervals
    createWave(0, numberOfCoins);      // First wave
    createWave(120, numberOfCoins);    // Second wave with delay
    createWave(240, numberOfCoins);    // Third wave with delay
  };

  const startCoinExplosion = (params: any) => {
    const rect = spinRef.current.getBoundingClientRect();
    const startX = rect.left + rect.width / 2 - EXPLOSION_COIN_SIZE / 2;
    // const startX = 0
    const startY = rect.top + rect.height / 2 - EXPLOSION_COIN_SIZE;

    createCoinsExplosion(startX, startY, '/images/lucky777/logo/monad.svg');
  };

  const startSlowScroll = () => {
    leftWheelAnimate(leftWheel.current, {
      rotateX: [leftWheelRotation.get(), leftWheelRotation.get() + 360]
    }, {
      ...WheelInfinityAnimation,
      duration: WheelInfinitySlowDuration,
    });
    centerWheelAnimate(centerWheel.current, {
      rotateX: [centerWheelRotation.get(), centerWheelRotation.get() + 360]
    }, {
      ...WheelInfinityAnimation,
      duration: WheelInfinitySlowDuration,
    });
    rightWheelAnimate(rightWheel.current, {
      rotateX: [rightWheelRotation.get(), rightWheelRotation.get() + 360]
    }, {
      ...WheelInfinityAnimation,
      duration: WheelInfinitySlowDuration,
    });
  };

  const startInfinityScroll: () => Promise<any> = () => new Promise((resolve) => {
    let leftWheelAnimation: any;
    let centerWheelAnimation: any;
    let rightWheelAnimation: any;
    leftWheelAnimation = leftWheelAnimate(leftWheel.current, {
      rotateX: [leftWheelRotation.get(), leftWheelRotation.get() + 360]
    }, WheelInfinityAnimation);
    spinTimerInfinityLeft.current = setTimeout(() => {
      clearTimeout(spinTimerInfinityLeft.current);
      centerWheelAnimation = centerWheelAnimate(centerWheel.current, {
        rotateX: [centerWheelRotation.get(), centerWheelRotation.get() + 360]
      }, WheelInfinityAnimation);
    }, WheelInfinityDelay * 1000);
    spinTimerInfinityCenter.current = setTimeout(() => {
      clearTimeout(spinTimerInfinityCenter.current);
      rightWheelAnimation = rightWheelAnimate(rightWheel.current, {
        rotateX: [rightWheelRotation.get(), rightWheelRotation.get() + 360]
      }, WheelInfinityAnimation);
    }, WheelInfinityDelay * 1000 * 2);

    spinTimerInfinityRight.current = setTimeout(() => {
      clearTimeout(spinTimerInfinityRight.current);
      resolve({
        leftWheelAnimation,
        centerWheelAnimation,
        rightWheelAnimation,
      });
    }, WheelInfinityDelay * 3 * 1000);
  });

  const startWheelResultScroll: (params: any) => Promise<any> = (params) => new Promise((resolve) => {
    // calc wheel position
    const { draw_codes, category } = params.data;
    const [leftCode, centerCode, rightCode] = draw_codes;

    const leftCategoryIndex = SpinCategories.findIndex((it) => Number(it.code) === Number(leftCode));
    const centerCategoryIndex = SpinCategories.findIndex((it) => Number(it.code) === Number(centerCode));
    const rightCategoryIndex = SpinCategories.findIndex((it) => Number(it.code) === Number(rightCode));

    console.log(
      "lottery code is left: %o(%o), center: %o(%o), right: %o(%o)",
      leftCode,
      SpinCategories[leftCategoryIndex].value,
      centerCode,
      SpinCategories[centerCategoryIndex].value,
      rightCode,
      SpinCategories[rightCategoryIndex].value,
    );

    const leftRandomArea = 0;
    const centerRandomArea = 0;
    const rightRandomArea = 0;
    const baseRotation = 360 * SpinBase;


    const leftWheelCodeRotation = baseRotation + WHEEL_AREA * leftRandomArea + (WHEEL_AREA - leftCategoryIndex * SpinCategoryRotation) - 1;
    const centerWheelCodeRotation = baseRotation + WHEEL_AREA * centerRandomArea + (WHEEL_AREA - centerCategoryIndex * SpinCategoryRotation) - 1;
    const rightWheelCodeRotation = baseRotation + WHEEL_AREA * rightRandomArea + (WHEEL_AREA - rightCategoryIndex * SpinCategoryRotation) - 1;

    leftWheelAnimate(leftWheel.current, {
      rotateX: [leftWheelRotation.get(), leftWheelCodeRotation]
    }, {
      type: "spring",
      duration: 1,
      onComplete: () => {
        centerWheelAnimate(centerWheel.current, {
          rotateX: [centerWheelRotation.get(), centerWheelCodeRotation]
        }, {
          type: "spring",
          duration: 1,
          onComplete: () => {
            rightWheelAnimate(rightWheel.current, {
              rotateX: [rightWheelRotation.get(), rightWheelCodeRotation]
            }, {
              type: "spring",
              duration: 1,
              onComplete: () => {
                resolve({});
              },
            });
          },
        });
      },
    });
    // spinTimerResult.current = setTimeout(() => {
    //   clearTimeout(spinTimerResult.current);
    //   resolve({});
    // }, WheelInfinityDelay * 3 * 1000);
  });

  const { run: handleSpin, loading: spinning } = useRequestByToken<any, any>(async () => {
    if (!address) {
      openConnectModal?.();
      return;
    }

    if (spinning || animateSpinning) {
      return;
    }


    if (!spinUserData?.spin_balance || spinUserData?.spin_balance <= 0 || leftSpin <= 0) {
      fail({ title: 'No spins left' }, 'bottom-right');
      setIsOpenSwitch(false);
      isOpenSwitchRef.current = false
      setDisabledBtnSpin(false);
      return;
    }

    if (leftSpin < multiple || spinUserData?.spin_balance <= multiple) {
      fail({ title: 'No enough spins balance' }, 'bottom-right');
      setIsOpenSwitch(false);
      isOpenSwitchRef.current = false
      setDisabledBtnSpin(false);
     
      return;
    }

    const machineSoundAudio = playSound(1);
    setPressed3(true);
    const newLeftSpin = leftSpin - multiple;
    setLeftSpin(newLeftSpin);

    console.log('newLeftSpin', newLeftSpin);

    if (newLeftSpin < 10) {
      setMultiple(1)
    } else {
      setMultiple(10)
    }
    // setTimeout(() => {
    //   setPressed3(false)
    // }, 7500);
    setAnimateSpinning(true);
    setTitle(DEFAULT_TITLE);
    // start wheel scroll
    const animations = await startInfinityScroll();

    // request api
    const res = await handleSpinResult();

    if (!res) {
      // animations.leftWheelAnimation.pause();
      // animations.centerWheelAnimation.pause();
      // animations.rightWheelAnimation.pause();
      startSlowScroll();
      if (machineSoundAudio) {
        machineSoundAudio.pause();
        machineSoundAudio.currentTime = 0;
      }
      setPressed3(false)
      return;
    }

    await startWheelResultScroll({
      ...animations,
      data: res,
    });

    if (res.xp_changed) {
      setXpBalance(res.xp_balance);
      setXpLevel(res.xp_level);
      setMaxXp(res.game_xp.xp);
      setLeftSpin(res.spin_balance);
    }

    if (machineSoundAudio) {
      machineSoundAudio.pause();
      machineSoundAudio.currentTime = 0;
    }

    if (Number(res.draw_amount) > 0) {
      success({ title: `WON ${res.draw_amount} MON` }, 'bottom-right');
      setTitle(('WON ' + res.draw_amount + ' MON!').repeat(2));
      // setTitle(DEFAULT_UNLUCKY_TITLE);
      playSound(2)
      startCoinExplosion(res);
    } else {
      if (res.draw_code === '666') {
        success({ title: `WON 1 ChogStarrr` }, 'bottom-right');
        setTitle(('WON 1 ChogStarrr').repeat(2));
        playSound(2)
        setTimeout(() => {
          if (Number(chogStarrr?.remaining) === 0) {
            startSlowScroll()
          }
        }, 3000);
      } else if (res.draw_code === '777') {
        success({ title: `WON 1 GTD` }, 'bottom-right');
        setTitle(('WON 1 GTD').repeat(2));
        playSound(2)
        setTimeout(() => {
          if (Number(monadverse?.remaining) === 0) {
            startSlowScroll()
          }
        }, 3000);
      } else if (res.draw_code === '888') {
        success({ title: `WON 1 Monadoon` }, 'bottom-right');
        setTitle(('WON 1 Monadoon').repeat(2));
        playSound(2)
        setTimeout(() => {
          if (Number(monadoon?.remaining) === 0) {
            startSlowScroll()
          }
        }, 3000);
      } else if (res.draw_code === '999') {
        success({ title: `WON 1 SLMND WL` }, 'bottom-right');
        setTitle(('WON 1 SLMND').repeat(2));
        playSound(2)
        setTimeout(() => {
          if (Number(slmnd?.remaining) === 0) {
            startSlowScroll()
          }
        }, 3000);
      } else if (res.draw_code === '101010') {
        success({ title: `WON 1 LaMouch` }, 'bottom-right');
        setTitle(('WON 1 LaMouch').repeat(2));
        playSound(2)
        setTimeout(() => {
          if (Number(lamouch?.remaining) === 0) {
            startSlowScroll()
          }
        }, 3000);
      } else if (res.draw_code === '111111') {
        success({ title: `WON 1 Overnads` }, 'bottom-right');
        setTitle(('WON 1 Overnads').repeat(2));
        playSound(2)
        setTimeout(() => {
          if (Number(overnads?.remaining) === 0) {
            startSlowScroll()
          }
        }, 3000);
      } else {
        setTitle(DEFAULT_UNLUCKY_TITLE);
      }
    }

    setPressed3(false)
    setAnimateSpinning(false);

    if (isOpenSwitchRef.current) {
      setDisabledBtnSpin(true);
      setTimeout(() => {
        handleSpin();
      }, 1000);
    }
  }, {
    manual: true,
  });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    startSlowScroll();

    return () => {
      clearTimeout(spinTimerInfinityLeft.current);
      clearTimeout(spinTimerInfinityCenter.current);
      clearTimeout(spinTimerInfinityRight.current);
    };
  }, []);

  useEffect(() => {
    const preloadImages = [
      '/images/lucky777/spin-btn-press.svg',
      '/images/lucky777/rules-press.svg',
      '/images/lucky777/history-2-press.svg',
      '/images/lucky777/multiple/x1-press.svg',
      '/images/lucky777/multiple/x10-press.svg',
      '/images/lucky777/multiple/x50-press.svg',
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        console.log(`${src} loaded`);
      };
    });

    const preloadAudios = [
      '/audios/lucky777/slot-machine-sound.mp3',
      '/audios/lucky777/winning-sound-effect.mp3'
    ];

    preloadAudios.forEach(src => {
      const audio = new Audio();
      audio.src = src;
      audio.load();
    });

  }, []);

  const playSound = useCallback((soundType: number) => {
    if (soundStore?.muted) {
      return;
    }

    const soundName = soundType === 1 ? 'slot-machine-sound' : 'winning-sound-effect'

    const audio = new Audio(`/audios/lucky777/${soundName}.mp3`);
    audio.volume = 1;
    if (soundType === 1) {
      audio.loop = true;
    }
    audio.play();

    return audio
  }, [soundStore]);

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[88px]">
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        marginBottom: '-2px',
        width: '765px',
        height: '750px',
        transform: `translate(-50%, 0) scale(${Math.min(size.height / 1000, 2)})`,
        transformOrigin: 'bottom center'
      }}>
        <Notice />
        <div className="absolute top-0 left-0 w-full h-full">
          <img src="/images/lucky777/xp/bg.png" alt="" className="w-full" />
        </div>
        
        <Xp data={spinUserData} xpBalance={xpBalance} xpLevel={xpLevel} maxXp={maxXp} />

        <div className={'ml-[10px] overflow-hidden absolute font-HackerNoonV2 text-[60px] leading-[110%] text-[#000] top-[20px] left-1/2 -translate-x-1/2 z-[2] w-[490px] h-[70px] flex flex-col items-center '}>
          <motion.div
            key={title}
            data-glitch={title}
            className={"flex items-center justify-center whitespace-nowrap " + (title !== DEFAULT_TITLE ? 'glitch' : '')}
            animate={title === DEFAULT_UNLUCKY_TITLE ? {
              x: [1100, -850]
            } : title !== DEFAULT_TITLE ? {
              x: [1100, -450]
            } : {}}
            transition={{
              duration: 6,
              ease: "easeOut"
            }}
            onAnimationComplete={() => {
              if (title !== DEFAULT_TITLE) {
                setTitle(DEFAULT_TITLE);
              }
            }}
          >
            {title}
          </motion.div>
        </div>

        {/* <div className='absolute font-HackerNoonV2 top-[145px] left-1/2 -translate-x-1/2 z-[2] w-[514px] h-[72px] flex flex-col items-center'>
          <div className='text-[20px]'>
            <span className='text-[#A5FFFD]'>{numberFormatter((spinUserData?.points_balance || 0) % MAX_POINT, 0, true)} /</span> <span className='text-[#A5FFFD] opacity-50'>{numberFormatter(MAX_POINT, 0, true)}</span>
          </div>

          <div className='flex justify-start items-center gap-[0px] w-[438px] pl-[10px] mt-[5px]'>
            <div className='w-[35px] h-[40px] bg-[url("/images/lucky777/plane.svg")] bg-no-repeat bg-center bg-contain'></div>
            <div className="flex items-center gap-[2px]">
              {Array(20).fill(null).map((_, index) => (
                <div
                  key={index}
                  className={`w-[15px] h-[15px] rounded-[4px] ${index < pointProgress ? 'bg-[#A5FFFD]' : 'bg-[#A5FFFD] opacity-10'}`}
                />
              ))}
            </div>
          </div>
        </div> */}

        <div className="absolute w-[386px] h-[168px] left-1/2 top-[194px] -translate-x-1/2 overflow-hidden">
          {/*#region Left*/}
          <motion.div
            className="absolute left-0 top-1/2 translate-x-[calc(-50%_+_60px)] -translate-y-1/2 [perspective:1000px]"
            style={{
              width: WHEEL_SIZE,
              height: WHEEL_SIZE,
            }}
          >
            <motion.div
              ref={leftWheel}
              className="w-full h-full relative [transform-style:preserve-3d]"
              style={{
                rotateX: leftWheelRotation,
              }}
            >
              {
                new Array(360 / WHEEL_AREA).fill(null).map((_, index) => SpinCategories.map((item, idx) => (
                  <div
                    key={`${index}-${idx}`}
                    className="absolute rounded-full top-1/2 left-1/2 origin-center opacity-100 -mt-[30px] -ml-[30px] [backface-visibility:hidden]"
                    style={{
                      transform: `rotateX(${index * WHEEL_AREA + idx * SpinCategoryRotation}deg) translateZ(${WHEEL_SIZE * 0.7 / 2}px) translateY(${item.centerY}px)`,
                      width: WHEEL_ICON_SIZE * item.centerScale,
                      height: WHEEL_ICON_SIZE * item.centerScale,
                    }}
                  >
                    <img src={item.icon} alt="" className="w-full" />
                  </div>
                )))
              }
            </motion.div>
          </motion.div>
          {/*#endregion*/}

          {/*#region Center*/}
          <motion.div
            className="absolute left-1/2 top-1/2 translate-x-[calc(-50%_+_5px)] -translate-y-1/2 [perspective:1000px]"
            style={{
              width: WHEEL_SIZE,
              height: WHEEL_SIZE,
            }}
          >
            <motion.div
              ref={centerWheel}
              className="w-full h-full relative [transform-style:preserve-3d]"
              style={{
                rotateX: centerWheelRotation,
              }}
            >
              {
                new Array(360 / WHEEL_AREA).fill(null).map((_, index) => SpinCategories.map((item, idx) => (
                  <div
                    key={`${index}-${idx}`}
                    className="absolute rounded-full top-1/2 left-1/2 origin-center opacity-100 -mt-[30px] -ml-[30px] [backface-visibility:hidden]"
                    style={{
                      transform: `rotateX(${index * WHEEL_AREA + idx * SpinCategoryRotation}deg) translateZ(${WHEEL_SIZE * 0.7 / 2}px) translateY(${item.centerY}px)`,
                      width: WHEEL_ICON_SIZE * item.centerScale,
                      height: WHEEL_ICON_SIZE * item.centerScale,
                    }}
                  >
                    <img src={item.icon} alt="" className="w-full" />
                  </div>
                )))
              }
            </motion.div>
          </motion.div>
          {/*#endregion*/}

          {/*#region Right*/}
          <motion.div
            className="absolute right=0 top-1/2 translate-x-[calc(-50%_+_335px)] -translate-y-1/2 [perspective:1000px]"
            style={{
              width: WHEEL_SIZE,
              height: WHEEL_SIZE,
            }}
          >
            <motion.div
              ref={rightWheel}
              className="w-full h-full relative [transform-style:preserve-3d]"
              style={{
                rotateX: rightWheelRotation,
              }}
            >
              {
                new Array(360 / WHEEL_AREA).fill(null).map((_, index) => SpinCategories.map((item, idx) => (
                  <div
                    key={`${index}-${idx}`}
                    className="absolute rounded-full top-1/2 left-1/2 origin-center opacity-100 -mt-[30px] -ml-[30px] [backface-visibility:hidden]"
                    style={{
                      transform: `rotateX(${index * WHEEL_AREA + idx * SpinCategoryRotation}deg) translateZ(${WHEEL_SIZE * 0.7 / 2}px) translateY(${item.centerY}px)`,
                      width: WHEEL_ICON_SIZE * item.centerScale,
                      height: WHEEL_ICON_SIZE * item.centerScale,
                    }}
                  >
                    <img src={item.icon} alt="" className="w-full" />
                  </div>
                )))
              }
            </motion.div>
          </motion.div>
          {/*#endregion*/}

          <img src="/images/lucky777/layer.svg" alt="" className="w-[121px] h-[168px] z-2 absolute top-0 left-0" />
          <img src="/images/lucky777/layer.svg" alt="" className="w-[121px] h-[168px] z-2 absolute top-0 left-1/2 -translate-x-1/2 ml-[2px]" />
          <img src="/images/lucky777/layer.svg" alt="" className="w-[121px] h-[168px] z-2 absolute top-0 right-0 mr-[-7px]" />

        </div>

        <motion.div
          className="absolute top-[250px] left-[130px] z-[2] w-[64px] h-[50px] bg-[url('/images/lucky777/left-arrow.svg')] bg-top bg-contain bg-no-repeat"
          key={spinning ? "spinning-left" : "static-left"}
          style={{
            transformOrigin: "left center",
            transform: "rotate(0deg)"
          }}
          animate={spinning ? {
            rotate: [-30, 30, -30]
          } : {}}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-[250px] right-[120px] z-[2] w-[64px] h-[50px] bg-[url('/images/lucky777/right-arrow.svg')] bg-top bg-contain bg-no-repeat"
          key={spinning ? "spinning-right" : "static-right"}
          style={{
            transformOrigin: "right center",
            transform: "rotate(0deg)"
          }}
          animate={spinning ? {
            rotate: [-30, 30, -30]
          } : {}}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div>
          <motion.button
            type="button"
            data-bp="1009-009"
            data-click-sound
            className="group absolute bottom-[270px] left-[190px] z-[4] w-[68px] h-[35px] bg-[url('/images/lucky777/multiple/x1.svg')] bg-no-repeat bg-center bg-contain "
            animate={{
              backgroundImage:
                leftSpin < 1 ? "url('/images/lucky777/multiple/x1-disabled.svg')" : multiple === 1 ? "url('/images/lucky777/multiple/x1-press.svg')" : "url('/images/lucky777/multiple/x1.svg')"
            }}
            onClick={() => {
              if (leftSpin < 1) {
                return;
              }
              setMultiple(1);
            }}
          >
            <div className="invisible group-hover:visible absolute top-[-140%] z-[10] left-[50%] text-left -translate-x-1/2 border border-[#645E8A] w-[270px] p-[5px_10px] rounded-[6px] text-[#D7D7F6] text-[10px] backdrop-blur-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
              Selecting x1 will consume a spin 1 times
              also your winning prize will x1</div>
          </motion.button>

          <motion.button
            type="button"
            data-click-sound
            data-bp="1009-010"
            className="absolute group bottom-[270px] left-[80px] z-[4] w-[68px] h-[35px] bg-[url('/images/lucky777/multiple/x10.svg')] bg-no-repeat bg-center bg-contain "
            animate={{
              backgroundImage:
                leftSpin < 10 ? "url('/images/lucky777/multiple/x10-disabled.svg')" : multiple === 10 ? "url('/images/lucky777/multiple/x10-press.svg')" : "url('/images/lucky777/multiple/x10.svg')"
            }}
            onClick={() => {
              if (leftSpin < 10) {
                return;
              }
              setMultiple(10);
            }}
          >
            <div className="invisible group-hover:visible absolute top-[-140%] z-[10] left-[50%] text-left -translate-x-1/2 border border-[#645E8A] w-[270px] p-[5px_10px] rounded-[6px] text-[#D7D7F6] text-[10px] backdrop-blur-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
              Selecting x10 will consume a spin 10 times
              also your winning prize will x10</div>
          </motion.button>

          <motion.button
            type="button"
            data-bp="1009-011"
            data-click-sound
            className="absolute group bottom-[310px] left-[150px] z-[2] w-[68px] h-[35px] bg-[url('/images/lucky777/multiple/x50.svg')] bg-no-repeat bg-center bg-contain "
            animate={{
              backgroundImage:
                leftSpin < 50 ? "url('/images/lucky777/multiple/x50-disabled.svg')" : multiple === 50 ? "url('/images/lucky777/multiple/x50-press.svg')" : "url('/images/lucky777/multiple/x50.svg')"
            }}
            onClick={() => {
              if (leftSpin < 50) {
                return;
              }
              setMultiple(50);
            }}
          >
            <div className="invisible group-hover:visible absolute top-[-140%] z-[10] left-[50%] text-left -translate-x-1/2 border border-[#645E8A] w-[270px] p-[5px_10px] rounded-[6px] text-[#D7D7F6] text-[10px] backdrop-blur-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]">
              Selecting x50 will consume a spin 50 times
              also your winning prize will x50</div>
          </motion.button>
        </div>

        <div data-click-sound className="absolute bottom-[280px] left-1/2 -translate-x-1/2 z-[2] w-[202px] h-[86px] flex flex-col items-center  max-w-full  bg-top bg-contain bg-no-repeat">
          <motion.button
            data-bp="1009-008"
            ref={spinRef}
            type="button"
            // disabled={spinning}  
            className="w-[202px] h-[85px] text-[18px] font-HackerNoonV2 leading-[90%] text-[#000] bg-[url('/images/lucky777/spin-btn.svg')] bg-bottom bg-no-repeat bg-contain disabled:opacity-50 disabled:cursor-not-allowed"
            animate={{ backgroundImage: pressed3 ? "url('/images/lucky777/spin-btn-press.svg')" : "url('/images/lucky777/spin-btn.svg')" }}
            style={{
              transformOrigin: "center bottom",
              y: 15,
            }}
            onClick={() => {
              if (disabledBtnSpin) {
                return;
              }
              handleSpin();
            }}
          >
            <div style={{
              transform: pressed3 ? 'translateY(-3px)' : 'translateY(-20px)'
            }}>
              <div>SPIN</div>
              <div className="text-[18px]">X {multiple}</div>
            </div>
          </motion.button>
        </div>

        <div>
          <motion.button
            data-bp="1009-005"
            type="button"
            data-click-sound
            className="absolute bottom-[310px] right-[140px] z-[2] w-[116px] h-[32px] bg-[url('/images/lucky777/rules.svg')] bg-no-repeat bg-center bg-contain "
            animate={{ backgroundImage: pressed2 ? "url('/images/lucky777/rules-press.svg')" : "url('/images/lucky777/rules.svg')" }}
            onClick={() => {
              setOpenRules(true);
              setPressed2(true);
              setTimeout(() => setPressed2(false), 500);
            }}
          />

          <motion.button
            data-bp="1009-006"
            type="button"
            data-click-sound
            className="absolute bottom-[270px] right-[105px] z-[2] w-[136px] h-[32px] bg-[url('/images/lucky777/history-2.svg')] bg-no-repeat bg-center bg-contain"
            animate={{ backgroundImage: pressed1 ? "url('/images/lucky777/history-2-press.svg')" : "url('/images/lucky777/history-2.svg')" }}
            onClick={() => {
              setOpenHistory(true);
              setPressed1(true);
              setTimeout(() => setPressed1(false), 500);
            }}
          />
        </div>

        {/* <div className={"absolute bottom-[80px] right-[145px] z-[2] w-[81px] h-[116px] bg-top bg-contain bg-no-repeat " + (spinUserData?.spin_balance > 0 ? "bg-[url('/images/lucky777/switch.svg')]" : "bg-[url('/images/lucky777/switch-no.svg')]")}>
        </div> */}

        <div className="font-HackerNoonV2 w-[349px] absolute bottom-[50px] left-[165px] z-[2] bg-[#31305A] rounded-[6px] p-[10px] border border-[#26274B]">
          <div className='bg-[#000000] rounded-[6px] border border-[#414266]'>
            <div className="flex items-center justify-between text-[20px] px-[10px] py-[5px] border-b border-[#A5FFFD5C]">
              <div className="text-[#A5FFFD] ">Times:</div>
              <div className="flex items-center gap-[2px] cursor-pointer" onClick={() => {
                getSpinUserData();
              }}>
                <motion.svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={spinUserDataLoading ? { rotate: 360 } : { rotate: 0 }}
                  transition={spinUserDataLoading ? { repeat: Infinity, duration: 1, ease: "linear" } : { duration: 0 }}
                  style={{ originX: "50%", originY: "50%" }}
                >
                  <path d="M10.7362 18.7455C6.88384 18.7455 3.74969 15.6543 3.74969 11.8543C3.74969 8.05504 6.88384 4.96387 10.7362 4.96387C11.903 4.96387 13.0591 5.25391 14.0796 5.8024C14.5804 6.07225 14.7684 6.69809 14.4985 7.19953C14.2313 7.70184 13.6057 7.88961 13.1021 7.61912C12.381 7.23111 11.5633 7.02637 10.7362 7.02637C8.021 7.02637 5.81219 9.19221 5.81219 11.8543C5.81219 14.5171 8.021 16.683 10.7362 16.683C12.9813 16.683 14.9418 15.1958 15.5029 13.0669C15.6492 12.5165 16.2145 12.1886 16.7639 12.333C17.3143 12.4787 17.6434 13.0426 17.4984 13.5933C16.6966 16.6264 13.9159 18.7455 10.7362 18.7455Z" fill="#6D7EA5" />
                  <path d="M17.1712 8.74491L15.2535 3.84239C15.1203 3.50186 14.6653 3.43891 14.4448 3.73067L11.1229 8.12637C10.9025 8.41813 11.087 8.83879 11.451 8.87403L16.6908 9.38084C17.0378 9.41457 17.2982 9.06975 17.1712 8.74491Z" fill="#6D7EA5" />
                </motion.svg>
                <span className="text-[#A5FFFD]">{leftSpin}</span></div>
            </div>

            <div className="flex items-center justify-between p-[10px]">
              <div className="text-[#A5FFFD] text-[10px] text-left w-[220px] opacity-30">1 Free daily</div>
              <motion.button
                data-bp="1009-007"
                data-click-sound
                type="button"
                className=" w-[80px] h-[27px] bg-[#BFFF60] rounded-[6px] text-[14px] text-black border cursor-pointer"
                onClick={() => {
                  setOpenBuyTimes(true)
                }}
              >Buy</motion.button>
            </div>

            <Redeem onRedeem={() => {
              getSpinUserData();
            }} />
          </div>
        </div>

        <Switch isOpen={isOpenSwitch} setIsOpenSwitch={setIsOpenSwitch} onOpenSwitch={(isOpenSwitch) => {
          isOpenSwitchRef.current = isOpenSwitch;
          if (!isOpenSwitch) {
            setDisabledBtnSpin(false);
          } else {
            handleSpin();
          }
        }} />

        <NftT monadverse={monadverse} monadoon={monadoon} slmnd={slmnd} lamouch={lamouch} overnads={overnads} />

      </div>

      <BuyTimesModal open={openBuyTimes} spinUserData={spinUserData} onClose={() => setOpenBuyTimes(false)} refreshData={getSpinUserData} />
      <HistoryModal open={openHistory} onClose={() => setOpenHistory(false)} />
      <RulesModal open={openRules} onClose={() => setOpenRules(false)} />

    </div>
  )
});
