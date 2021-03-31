import { avi } from "../mod.ts";

const opts = {
  width: 500,
  height: 450,
};

avi("./testdata/video.mp4", "output", opts);
