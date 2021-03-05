import { gif } from "../mod.ts";

const options = {
  width: 480,
  height: 380,
};

gif("./testdata/video.mp4", "output", options);
