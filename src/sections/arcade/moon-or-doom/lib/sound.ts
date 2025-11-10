// 存储预加载的音频实例
const audioPreloads: Record<number, HTMLAudioElement> = {};

/**
 * 预加载所有音频文件
 * @returns {HTMLAudioElement[]} 预加载的音频数组
 */
export function preloadAudio() {
    const audioArray: HTMLAudioElement[] = [];
    const loadPromises: Promise<void>[] = [];
    for (let i = 1; i <= 7; i++) {
        const audio = new Audio(`/images/moon-or-doom/${i}.ogg`);
        audio.preload = "auto";
        audioPreloads[i as keyof typeof audioPreloads] = audio;
        audioArray.push(audio);

        // 创建一个 promise 等待 canplaythrough 事件或 error 事件
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
            // 兼容部分浏览器，需要调用 load 手动加载
            audio.load();
        });
        loadPromises.push(loadPromise);
    }
    // 返回一个 promise，全部 audio 都加载完毕后完成
    return Promise.all(loadPromises).then(() => audioArray);
}

/**
 * 清理所有预加载的音频
 */
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

/**
 * 播放指定编号的音频
 * @param {number} soundNumber 音频编号 (1-7)
 * @returns {Promise<void>}
 */
function playSound(soundNumber: number) {
    if (soundNumber < 1 || soundNumber > 7) {
        console.warn(`音频编号 ${soundNumber} 超出范围，应为 1-7`);
        return Promise.resolve();
    }

    const audio = audioPreloads[soundNumber];
    if (!audio) {
        console.warn(`音频 ${soundNumber} 尚未预加载`);
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        audio.currentTime = 0;
        audio.play().then(resolve).catch(reject);
    });
}

// 导出各个音频的播放方法
export const playSound1 = () => playSound(1);
export const playSound2 = () => playSound(2);
export const playSound3 = () => playSound(3);
export const playSound4 = () => playSound(4);
export const playSound5 = () => playSound(5);
export const playSound6 = () => playSound(6);
export const playSound7 = () => playSound(7);

