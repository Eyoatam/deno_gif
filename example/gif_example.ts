import { gif } from "../mod.ts";

const options = {
  width: 480,
  height: 380,
};

gif(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
  options,
);
