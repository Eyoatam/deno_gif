export interface Options {
  width: number;
  height: number;
}

export interface EventProgress {
  done: boolean;
  outTimeMs: number;
  frame: number;
  fps: number;
  speed: number;
  progress: number;
}
