import { colorsTs, ffmpegTs } from "../deps/mod.ts";
import { EncodingProgress, Options } from "../types/types.ts";

/**
 * convert `input` file to output `gif` with the given `options`
 * @param input
 * @param output
 * @param width @default 480
 * @param height @default 380
 */
export async function gif(input: string, output: string, options: Options) {
  checkInputAndOutput(input, output);

  /**
   * @todo make output size and time options available
   */

  // convert to gif
  const encoder = await ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", handleProgress)
    .width(options.width || 480)
    .height(options.height || 380)
    .output(output)
    .encode();
}

function checkInputAndOutput(input: string, output: string) {
  if (!input) {
    const error = new Error("input file is required");
    throw error;
  }

  if (!output) {
    const error = new Error("output file is required");
    throw error;
  }
}

function handleProgress(event: EncodingProgress) {
  if (!event.frame && !event.outTimeMs && !event.fps && !event.speed) {
    console.log(colorsTs.green("[ffmpeg]: ") + `progress ${event.progress}`);
  }
  if (!event.fps && !event.frame) {
    console.log(
      colorsTs.green("[ffmpeg]: ") +
        `time: ${event.outTimeMs}ms speed: ${event.speed}x`
    );
  }
  if (event.done) {
    console.log(`✨Done✨ in ${event.outTimeMs} ms`);
  } else {
    console.log(
      colorsTs.green("[ffmpeg]: ") +
        `frame: ${event.frame} fps: ${event.fps} time: ${event.outTimeMs}ms speed: ${event.speed}x`
    );
  }
}
