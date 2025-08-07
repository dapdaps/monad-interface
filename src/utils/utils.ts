import Big from "big.js";
import { post, postFile } from "./http";

export function isValid(a: any) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

export function formatHealthFactor(hf: any) {
  try {
    if (hf === "∞") return hf;

    if (!hf || !isValid(hf)) return "-";

    if (Big(hf).gt(10000)) return "∞";
    if (Number(hf) === -1) return "∞";
    return Big(hf).toFixed(2);
  } catch (error) {
    console.log("CATCH_formatHealthFactor:", error);
  }
}

export function formatLongText(
  text?: string,
  front: number = 4,
  ending: number = 2
) {
  if (!text) return text;
  if (typeof text !== "string") {
    text = text + "";
  }
  if (text.length <= front + ending) {
    return text;
  }
  return `${text.slice(0, front)}...${text.slice(-ending)}`;
}

export function readClipboard() {
  try {
    return navigator.clipboard.readText();
  } catch (err) {
    console.log('read clipboard failed: %o', err);
  }
  return Promise.resolve('');
}


export function getProtocolIcon(protocal) {
  const ImageMapping = {
    infrared: "/images/dapps/infrared/infrared.svg",
    bex: "/images/dapps/bex.svg",
    kodiak: "/images/dapps/kodiak.svg",
    berps: "/images/dapps/infrared/berps.svg",
    aquabera: "/images/dapps/infrared/aquabera.png",
    hub: "/images/dapps/bex.svg"
  }
  return ImageMapping?.[protocal?.toLocaleLowerCase()] ?? "/images/dapps/dolomite.svg"
}

export const isVideoFile = (url: string) => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const fileExtMatch = pathname.match(/\.([^./?]+)(?:[?#]|$)/);
    if (!fileExtMatch) return false;

    const extension = fileExtMatch[1].toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    return videoExtensions.includes(extension);
  } catch (e) {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  }
};

export function base64ToBlob(base64Data: string) {
  const dataArr: any = base64Data.split(",");
  const imageType = dataArr[0].match(/:(.*?);/)[1];
  const textData = window.atob(dataArr[1]);
  const arrayBuffer = new ArrayBuffer(textData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < textData.length; i++) {
    uint8Array[i] = textData.charCodeAt(i);
  }
  return [new Blob([arrayBuffer], { type: imageType }), imageType.slice(6)];
}

export async function uploadFile(file: File | Blob, url: string = '/upload') {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await postFile(url, formData);

    if (response.code === 200) {
      return response.data.url;
    } else {
      throw new Error(response.message);
    }

  } catch (error) {
    console.error('uplaod fail:', error);
    throw error;
  }
}

export function shareToX(text: string, link?: string) {
  let xPath = `https://x.com/intent/tweet?text=${text}`
  if (link) {
    xPath += `&url=${encodeURIComponent(link)}`
  }
  window.open(xPath);
}


  
export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.substring(1);
}