import { motion, useAnimate, useMotionValue } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SPIN_CATEGORIES, SpinCategory } from '@/sections/lucky777/config';
import { numberFormatter } from '@/utils/number-formatter';
import { useRequestByToken } from '../hooks/use-request-by-token';
import BuyTimesModal from './buyTimes';
import useToast from '@/hooks/use-toast';
import Big from 'big.js';
import HistoryModal from './history';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useCountDown, useInterval } from 'ahooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import RulesModal from './rules';
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

const WHEEL_SIZE = 500;
const WHEEL_AREA = 120;
const WHEEL_ICON_SIZE = 65;
const SPIN_PROGRESS_BASE = 10; // percent
const EXPLOSION_COIN_SIZE = 100;

const TOTAL_SPINS = 50;

const SpinCategories = Object.values(SPIN_CATEGORIES);
const SpinCategoryRotation = WHEEL_AREA / SpinCategories.length;
const SpinBase = 10;

const WheelInfinityDelay = 0.3;
const WheelInfinitySlowDuration = 20;
const WheelInfinityAnimation: any = {
  duration: WheelInfinityDelay,
  ease: 'linear',
  repeat: Infinity,
};

const MAX_POINT = 10000;
const DEFAULT_TITLE = 'LUCKY 777';

export default memo(function Tiger(props: any) {
  const {
    spinUserData,
    handleSpinResult,
    getSpinUserData,
  } = props;

  const [openBuyTimes, setOpenBuyTimes] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const toast = useToast();
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const { address } = useAccount();
  const { open } = useAppKit();
  const [freeTimes, setFreeTimes] = useState(getTimeLeftToUTC24());
  // const [countdown] = useCountDown({ targetDate: freeTimes });

  useInterval(() => {
    setFreeTimes(getTimeLeftToUTC24());
  }, 1000);


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
    const horizontalDistance = (Math.random() - 0.5) * 2800;
    const maxHeight = -1 * window.innerHeight;

    // Movement and rotation animation keyframes
    const moveKeyframes = [
      // Initial position
      {
        transform: 'translate(0, 0) rotate(0deg)',
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
    const startY = 0

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
    const { draw_code, category } = params.data;
    const [leftCode, centerCode, rightCode] = [draw_code.slice(0, 1), draw_code.slice(1, 2), draw_code.slice(2)];

    const leftCategoryIndex = SpinCategories.findIndex((it) => it.code === leftCode);
    const centerCategoryIndex = SpinCategories.findIndex((it) => it.code === centerCode);
    const rightCategoryIndex = SpinCategories.findIndex((it) => it.code === rightCode);

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

    console.log("lottery wheel random area: %o, center: %o, right: %o", leftRandomArea, centerRandomArea, rightRandomArea);


    // const leftWheelCodeRotation = baseRotation + WHEEL_AREA * leftRandomArea + (WHEEL_AREA - leftCategoryIndex * SpinCategoryRotation) - 1;

    const leftWheelCodeRotation = baseRotation + WHEEL_AREA * leftRandomArea + (WHEEL_AREA - leftCategoryIndex * SpinCategoryRotation) - 1;
    const centerWheelCodeRotation = baseRotation + WHEEL_AREA * centerRandomArea + (WHEEL_AREA - centerCategoryIndex * SpinCategoryRotation) - 1;
    const rightWheelCodeRotation = baseRotation + WHEEL_AREA * rightRandomArea + (WHEEL_AREA - rightCategoryIndex * SpinCategoryRotation) - 1;

    console.log("lottery wheel rotation left: %o, center: %o, right: %o", leftWheelCodeRotation, centerWheelCodeRotation, rightWheelCodeRotation);

    leftWheelAnimate(leftWheel.current, {
      rotateX: [leftWheelRotation.get(), leftWheelCodeRotation]
    }, {
      type: "spring",
      onComplete: () => {
        centerWheelAnimate(centerWheel.current, {
          rotateX: [centerWheelRotation.get(), centerWheelCodeRotation]
        }, {
          type: "spring",
          onComplete: () => {
            rightWheelAnimate(rightWheel.current, {
              rotateX: [rightWheelRotation.get(), rightWheelCodeRotation]
            }, {
              type: "spring",
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
      open();
      return;
    }

    if (!spinUserData?.spin_balance || spinUserData?.spin_balance <= 0) {
      toast.fail({ title: 'No spins left' });
      return;
    }
    const machineSoundAudio = playSound(1);
    setTitle(DEFAULT_TITLE);
    console.log('spinUserData:', spinUserData);

    // start wheel scroll
    const animations = await startInfinityScroll();

    // request api
    const res = await handleSpinResult();

    console.log('res:', res);

    if (!res) {
      // animations.leftWheelAnimation.pause();
      // animations.centerWheelAnimation.pause();
      // animations.rightWheelAnimation.pause();
      startSlowScroll();
      return;
    }

    await startWheelResultScroll({
      ...animations,
      data: res,
    });

    toast.success({ title: `Get ${res.draw_points} points` });
    machineSoundAudio.pause();
    machineSoundAudio.currentTime = 0;
    playSound(2)

    if (res.points_balance >= MAX_POINT) {
      startCoinExplosion(res);
      setTitle('WON 1 MON!');
    } else {
      setTitle('WON ' + res.draw_points + ' !');
    }
  }, {
    manual: true,
  });

  useEffect(() => {
    startSlowScroll();

    return () => {
      clearTimeout(spinTimerInfinityLeft.current);
      clearTimeout(spinTimerInfinityCenter.current);
      clearTimeout(spinTimerInfinityRight.current);
    };
  }, []);

  const pointProgress = useMemo(() => {
    return Math.floor(spinUserData?.points_balance / MAX_POINT * 20);
  }, [spinUserData]);

  useEffect(() => {
    const preloadImages = [
      '/images/lucky777/spin-btn-press.svg',
      '/images/lucky777/rules-press.svg', 
      '/images/lucky777/history-2-press.svg'
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
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
    const soundName = soundType === 1 ? 'slot-machine-sound' : 'winning-sound-effect'

    const audio = new Audio(`/audios/lucky777/${soundName}.mp3`);
    audio.volume = 0.5;
    if (soundType === 1) {
      audio.loop = true;
    }
    audio.play();

    return audio
  }, []);



  return (
    <div className="w-full flex flex-col items-center justify-center pt-[88px]">
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[765px] h-[767px]">
        <div className="absolute top-0 left-0 w-full h-full">
          <img src="/images/lucky777/slot-machine.svg" alt="" className="w-full" />
        </div>

        <div data-glitch={title} className={'ml-[10px] absolute font-HackerNoonV2 text-[60px] leading-[110%] text-[#000] top-[20px] left-1/2 -translate-x-1/2 z-[2] w-[490px] h-[72px] flex flex-col items-center ' + (title !== DEFAULT_TITLE ? 'glitch' : '')}>
          {title}
        </div>

        <div className='absolute font-HackerNoonV2 top-[145px] left-1/2 -translate-x-1/2 z-[2] w-[514px] h-[72px] flex flex-col items-center'>
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
        </div>

        <div className="absolute w-[386px] h-[168px] left-1/2 top-[255px] -translate-x-1/2 overflow-hidden">
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
            className="absolute right=0 top-1/2 translate-x-[calc(-50%_+_340px)] -translate-y-1/2 [perspective:1000px]"
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
          className="absolute top-[310px] left-[130px] z-[2] w-[64px] h-[50px] bg-[url('/images/lucky777/left-arrow.svg')] bg-top bg-contain bg-no-repeat"
          key={spinning ? "spinning-left" : "static-left"}
          style={{
            transformOrigin: "left center",
            transform: "rotate(0deg)"
          }}
          animate={spinning ? {
            rotate: [-30, 30, -30]
          } : {}}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-[310px] right-[120px] z-[2] w-[64px] h-[50px] bg-[url('/images/lucky777/right-arrow.svg')] bg-top bg-contain bg-no-repeat"
          key={spinning ? "spinning-right" : "static-right"}
          style={{
            transformOrigin: "right center",
            transform: "rotate(0deg)"
          }}
          animate={spinning ? {
            rotate: [-30, 30, -30]
          } : {}}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div data-click-sound className="absolute bottom-[240px] left-1/2 -translate-x-1/2 z-[2] w-[202px] h-[86px] flex flex-col items-center  max-w-full  bg-top bg-contain bg-no-repeat">
          <motion.button
            ref={spinRef}
            type="button"
            // disabled={spinning}
            className="w-[202px] h-[85px] bg-[url('/images/lucky777/spin-btn.svg')] bg-no-repeat bg-center bg-contain disabled:opacity-50 disabled:cursor-not-allowed"
            whileTap={spinning ? {} : {
              backgroundImage: "url('/images/lucky777/spin-btn-press.svg')"
            }}
            style={{
              transformOrigin: "center bottom",
              y: 15,
            }}
            onClick={handleSpin}
          />
        </div>

        <div>
        <motion.button
            type="button"
            data-click-sound
            className="absolute bottom-[270px] right-[140px] z-[2] w-[116px] h-[32px] bg-[url('/images/lucky777/rules.svg')] bg-no-repeat bg-center bg-contain "
            whileTap={{
              backgroundImage: "url('/images/lucky777/rules-press.svg')"
            }}
            onClick={() => {
              setOpenRules(true);
            }}
          />

          <motion.button
            type="button"
            data-click-sound
            className="absolute bottom-[230px] right-[105px] z-[2] w-[136px] h-[32px] bg-[url('/images/lucky777/history-2.svg')] bg-no-repeat bg-center bg-contain"
            whileTap={{
              backgroundImage: "url('/images/lucky777/history-2-press.svg')"
            }}
            onClick={() => {
              setOpenHistory(true);
            }}
          />
        </div>

        <div className={"absolute bottom-[30px] right-[140px] z-[2] w-[81px] h-[116px] bg-top bg-contain bg-no-repeat " + (spinUserData?.spin_balance > 0 ? "bg-[url('/images/lucky777/switch.svg')]" : "bg-[url('/images/lucky777/switch-no.svg')]")}>
        </div>

        <div className="font-HackerNoonV2 w-[309px] h-[93px] absolute bottom-[30px] left-[200px] z-[2] px-[12px] py-[10px]">
          <div className="flex items-center justify-between text-[20px]">
            <div className="text-[#A5FFFD] ">Times:</div>
            <div className="text-[#A5FFFD]">{spinUserData?.spin_balance}</div>
          </div>

          <div className="flex items-center justify-between mt-[10px]">
            <div className="text-[#A5FFFD] text-[12px]">1 FREE IN {freeTimes.hours}:{freeTimes.minutes}:{freeTimes.seconds}</div>
            <motion.button
              data-click-sound
              type="button"
              className=" w-[80px] h-[27px] bg-[#BFFF60] rounded-[6px] text-[14px] text-black border cursor-pointer"
              onClick={() => {
                setOpenBuyTimes(true)
              }}
            >Buy</motion.button>
          </div>
        </div>
      </div>

      <BuyTimesModal open={openBuyTimes} onClose={() => setOpenBuyTimes(false)} refreshData={getSpinUserData} />
      <HistoryModal open={openHistory} onClose={() => setOpenHistory(false)} />
      <RulesModal open={openRules} onClose={() => setOpenRules(false)} /> 
    </div>
  )
});
