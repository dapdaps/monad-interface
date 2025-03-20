import { useSoundStore } from "@/stores/sound";
import { memo } from "react";

export default memo(function Sound() {
  const soundStore = useSoundStore()
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
    </>
  )
})
