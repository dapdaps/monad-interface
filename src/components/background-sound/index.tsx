import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from "react";

export default memo(forwardRef(function BackgroundSound({
  src = "/audios/dapps/clipping.mp3",
  config
}: {
  src: string
  config: any
}, ref) {
  const audioRef = useRef()
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      try {
        audioRef.current.play();
      } catch (error) {
        throw new Error(error)
      }
    }
  };
  const pauseSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };
  const mutedSound = (muted) => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }
  const refs = {
    muted: mutedSound,
    play: playSound,
    pause: pauseSound
  };
  useImperativeHandle(ref, () => refs);

  return (
    <>
      <audio
        src={src}
        ref={audioRef}
        className="absolute -left-[9999px] -top-[9999px]"
        {...config}
      />
    </>
  )
}))