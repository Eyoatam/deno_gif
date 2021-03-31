import { webm } from "../mod.ts";

const opts = {
  width: 500,
  height: 500,
};

webm("./testdata/video.mp4", "output", opts);
