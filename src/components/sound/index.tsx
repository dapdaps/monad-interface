import { memo, useEffect, useRef } from "react";
import Audio from "../audio";
import { useSoundStore } from "@/stores/sound";

export default memo(function Sound() {
  const clippingRef = useRef()
  const conveyorBeltRef = useRef()
  const pressButtonRef = useRef()
  const movingMachanicRef = useRef()
  const soundStore = useSoundStore()
  useEffect(() => {
    soundStore.set({
      clippingRef,
      conveyorBeltRef,
      pressButtonRef,
      movingMachanicRef,
    })

  }, [])

  useEffect(() => {
    console.log('====', soundStore?.muted)
    if (clippingRef.current) {
      clippingRef.current.muted(soundStore?.muted)
    }
    if (conveyorBeltRef.current) {
      conveyorBeltRef.current.muted(soundStore?.muted)
    }
    if (pressButtonRef.current) {
      pressButtonRef.current.muted(soundStore?.muted)
    }
    if (movingMachanicRef.current) {
      movingMachanicRef.current.muted(soundStore?.muted)
    }
  }, [soundStore?.muted])
  return (
    <>
      <div
        className="w-[24px] cursor-pointer"
        onClick={() => {
          soundStore.set({
            muted: !soundStore?.muted
          })
        }}
      >
        {
          soundStore?.muted ? (
            <img src="/images/close_audio.svg" alt="close_audio" />
          ) : (
            <img src="/images/open_audio.svg" alt="open_audio" />
          )
        }
      </div>
      <Audio
        src="/audios/dapps/clipping.mp3"
        ref={clippingRef}
      />
      <Audio
        src="/audios/dapps/conveyor_belt.mp3"
        ref={conveyorBeltRef}
        config={{
          autoPlay: true,
          loop: true,
        }}
      />
      <Audio
        src="/audios/press_button.mp3"
        ref={pressButtonRef}
      />
      <Audio
        src="/audios/dapps/moving_machanic_clip.mp3"
        ref={movingMachanicRef}
        config={{
          autoPlay: true,
          loop: true,
        }}
      />
    </>
  )
})
