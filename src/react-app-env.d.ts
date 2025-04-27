/// <reference types="react-scripts" />

//
declare module '*.mp3' {
  const src: string;
  export default src;
}

//
interface Window {
  webkitAudioContext: typeof AudioContext;
}
