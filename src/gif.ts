import { colorsTs, ffmpegTs } from "../deps/mod.ts";

interface Options {
  width: number;
  height: number;
}

/**
 * convert `input` file to output `gif` with the given `options`
 *  - `width` max width [500]
 *  - `height` max height [none]
 *
 * @param input
 * @param output
 * @param width @default 480
 * @param height @default 380
 */
export async function gif(input: string, output: string, options: Options) {
  if (!input) {
    const error = new Error("input file is required");
    throw error;
  }

  if (!output) {
    const error = new Error("output file is required");
    throw error;
  }

  /**
	 * @todo make output size and time options available
	 */

  // convert to gif
  const encoder = await ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", (event) => {
      if (event.progress < 100) {
        console.log(
          colorsTs.green("[ffmpeg]: ") +
            `frame ${event.frame} fps: ${event.fps} time: ${event.outTimeMs}ms speed: ${event.speed}x`,
        );
      } else {
        console.log(`✨Done✨ in ${event.outTimeMs} ms`);
      }
    })
    .width(options.width || 480)
    .height(options.height || 380)
    .output(output)
    .encode();
}
