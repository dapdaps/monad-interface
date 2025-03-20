import { useSoundStore } from "@/stores/sound";
import { memo, useEffect, useRef } from "react";
import BackgroundSound from "../background-sound";

export default memo(function Sound() {
  const soundStore = useSoundStore()
  const conveyorBeltRef = useRef()
  useEffect(() => {
    soundStore.set({
      conveyorBeltRef,
    })

  }, [])

  useEffect(() => {
    if (conveyorBeltRef.current) {
      conveyorBeltRef.current.muted(soundStore?.muted)
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
      <BackgroundSound
        src="/audios/dapps/conveyor_belt.mp3"
        ref={conveyorBeltRef}
        config={{
          loop: true
        }}
      />
    </>
  )
})
