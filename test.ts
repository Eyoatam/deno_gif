import { gif } from "./mod.ts";

const opts = {
  width: 480,
  height: 300,
};
gif("./output.mp4", "output.gif", opts);
