const Audios = (props: any) => {
  const {
    audioRefs,
  } = props;

  return (
    <div className="w-0 h-0 absolute z-[-100] opacity-0 left-0 bottom-0 overflow-hidden">
      {
        AudioList.map((audio) => (
          <audio
            key={audio.type}
            ref={(node) => {
              const map = audioRefs.current;
              map.set(audio.type, node);
              return () => {
                map.delete(audio.type);
              };
            }}
            controls={false}
            autoPlay={false}
            loop={audio.loop}
            preload="auto"
          >
            <source src={audio.src} type={audio.audioType} />
          </audio>
        ))
      }
    </div>
  );
};

export default Audios;

const AudioList = [
  {
    type: "select",
    src: "/audios/mainnet/arcade/guess-who/select.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "click",
    src: "/audios/mainnet/arcade/guess-who/click.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "success",
    src: "/audios/mainnet/arcade/guess-who/success.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "error",
    src: "/audios/mainnet/arcade/guess-who/error.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "notification",
    src: "/audios/mainnet/arcade/guess-who/notification.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "win",
    src: "/audios/mainnet/arcade/guess-who/win.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "failed",
    src: "/audios/mainnet/arcade/guess-who/failed.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
  {
    type: "environment",
    src: "/audios/mainnet/arcade/guess-who/environment.mp3",
    loop: false,
    audioType: "audio/mp3",
  },
];
