import { useCallback, useEffect, useRef, useState } from 'react';
import { useSoundStore } from '../stores/sound';

export default function useAudioPlay() {
  const [playing, setPlaying] = useState(false);
  const [playingUrl, setPlayingUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>();
  const { muted } = useSoundStore((state: any) => state);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlaying(false);
      setPlayingUrl('');
    }
  }, []);

  const play = useCallback(
    async (url: string) => {
      if (muted) return;
      try {
        if (audioRef.current && playingUrl === url) {
          if (playing) {
            pause();
          } else {
            await audioRef.current.play();
            setPlaying(true);
          }
          return;
        }

        if (audioRef.current) {
          pause();

          await new Promise(resolve => setTimeout(resolve, 50));
        }

        const audio = new Audio(url);

        audio.preload = 'auto';
        audioRef.current = audio;
        

        await new Promise((resolve, reject) => {
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', reject, { once: true });
        });

        if (!muted) { 
          await audio.play();
          setPlayingUrl(url);
          setPlaying(true);
        }
        
        audio.onended = () => {
          setPlaying(false);
          audioRef.current = null;
          setPlayingUrl('');
        };
      } catch (error) {
        console.error('Audio playback error:', error);
        pause();
      }
    },
    [playing, playingUrl, pause, muted],
  );

  useEffect(
    () => () => {
      pause();
    },
    [pause],
  );

  return { playing, playingUrl, play, pause };
}
