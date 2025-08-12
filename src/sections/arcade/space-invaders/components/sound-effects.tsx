import { useSpaceInvadersContext } from "../context";

const SoundEffects = () => {
  const {
    soundEffectCashoutRef,
    soundEffectOpenRef,
    soundEffectDeathRef,
    soundEffectShuffleGatesRef,
    soundEffectStartRef,
    soundEffectGetRewardRef,
  } = useSpaceInvadersContext();

  return (
    <div className="w-0 h-0 hidden opacity-0 absolute z-[-1] flex-0 left-[-9999px] bottom-[-9999px]">
      <audio
        ref={soundEffectCashoutRef}
        autoPlay={false}
        preload="auto"
      >
        <source
          src="/audios/arcade/space-invaders/cashout.ogg"
          type="audio/ogg"
        />
      </audio>
      <audio
        ref={soundEffectOpenRef}
        autoPlay={false}
        preload="auto"
      >
        <source
          src="/audios/arcade/space-invaders/click.ogg"
          type="audio/ogg"
        />
      </audio>
      <audio
        ref={soundEffectDeathRef}
        autoPlay={false}
        preload="auto"
      >
        <source
          src="/audios/arcade/space-invaders/death.ogg"
          type="audio/ogg"
        />
      </audio>
      <audio
        ref={soundEffectShuffleGatesRef}
        autoPlay={false}
        preload="auto"
      >
        <source
          src="/audios/arcade/space-invaders/Shuffle-Gates.ogg"
          type="audio/ogg"
        />
      </audio>
      <audio
        ref={soundEffectStartRef}
        autoPlay={false}
        preload="auto"
      >
        <source
          src="/audios/arcade/space-invaders/start.ogg"
          type="audio/ogg"
        />
      </audio>
      <audio
        ref={soundEffectGetRewardRef}
        autoPlay={false}
        preload="auto"
      >
        <source
          src="/audios/arcade/space-invaders/NFT-reward.ogg"
          type="audio/ogg"
        />
      </audio>
    </div>
  );
};

export default SoundEffects;
