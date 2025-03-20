import useAudioPlay from "@/hooks/use-audio";
import { useEffect } from "react";

const withSound = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { play } = useAudioPlay()
    
    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest("[data-click-sound]");
        if (target) {
          const targetSrc = target.getAttribute("data-click-sound") 
          const soundSrc = !targetSrc || targetSrc === "true" ? "/audios/press_button.mp3" : targetSrc;
          play(soundSrc);
        }
      };

      const handleHover = (event: MouseEvent) => {
        const target = (event.target as HTMLElement).closest("[data-hover-sound]");
        if (target) {
          const targetSrc = target.getAttribute("data-hover-sound");
          const soundSrc = !targetSrc || targetSrc === "true" ? "/audios/hover.mp3" : targetSrc;
          play(soundSrc);
        }
      };

      document.addEventListener("click", handleClick);
      document.addEventListener("mouseover", handleHover);

      return () => {
        document.removeEventListener("click", handleClick);
        document.removeEventListener("mouseover", handleHover);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withSound;
