import { mp4 } from "../mod.ts";

const opts = {
  width: 500,
  height: 450,
};

mp4("./testdata/video.mp4", "output", opts);
