export interface Options {
  width: number;
  height: number;
  mp3?: string;
  mp4?: string;
  avi?: string;
  webm?: string;
}

export interface CLiOptions {
  input: string;
  output: string;
}

export interface EncodingProgress {
  done: boolean;
  outTimeMs: number;
  frame: number;
  fps: number;
  speed: number;
  progress: number;
}
