import { useSoundStore } from "@/stores/sound";

const audioPreloads: Record<number, HTMLAudioElement> = {};


export function preloadAudio() {
    const audioArray: HTMLAudioElement[] = [];
    const loadPromises: Promise<void>[] = [];
    for (let i = 1; i <= 7; i++) {
        const audio = new Audio(`/images/moon-or-doom/${i}.ogg`);
        audio.preload = "auto";
        audioPreloads[i as keyof typeof audioPreloads] = audio;
        audioArray.push(audio);

        const loadPromise = new Promise<void>((resolve) => {
            const cleanup = () => {
                audio.removeEventListener('canplaythrough', onLoad);
                audio.removeEventListener('error', onLoad);
            };
            const onLoad = () => {
                cleanup();
                resolve();
            };
            audio.addEventListener('canplaythrough', onLoad, { once: true });
            audio.addEventListener('error', onLoad, { once: true });
            audio.load();
        });
        loadPromises.push(loadPromise);
    }
    return Promise.all(loadPromises).then(() => audioArray);
}

export function cleanupAudio() {
    Object.values(audioPreloads).forEach(audio => {
        if (audio) {
            audio.src = "";
        }
    });
    Object.keys(audioPreloads).forEach(key => {
        delete audioPreloads[Number(key) as keyof typeof audioPreloads];
    });
}


function playSound(soundNumber: number) {
    const soundStore = useSoundStore.getState();
    if (soundStore?.muted) {
        return Promise.resolve();
    }

    if (soundNumber < 1 || soundNumber > 7) {
        return Promise.resolve();
    }

    const audio = audioPreloads[soundNumber];
    if (!audio) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        audio.currentTime = 0;
        audio.play().then(resolve).catch(reject);
    });
}

export const playSound1 = () => playSound(1);
export const playSound2 = () => playSound(2);
export const playSound3 = () => playSound(3);
export const playSound4 = () => playSound(4);
export const playSound5 = () => playSound(5);
export const playSound6 = () => playSound(6);
export const playSound7 = () => playSound(7);

