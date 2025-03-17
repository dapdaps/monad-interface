import { forwardRef, memo, useImperativeHandle, useRef } from "react";

export default memo(forwardRef(function sound({
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
      audioRef.current.play();
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
    <audio
      src={src}
      ref={audioRef}
      className="absolute -left-[9999px] -top-[9999px]"
      {...config}
    />
  )
}))
