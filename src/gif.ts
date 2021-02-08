import { colorsTs, ffmpegTs } from "../deps/mod.ts";
import { EncodingProgress, Options } from "../types/types.ts";

/**
 * convert `input` video files to `gifs` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function gif(input: string, output: string, options: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to gif
  const encoder = ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", handleProgress)
    .width(options.width || 480)
    .height(options.height || 380)
    .output(output + ".gif")
    .encode();
}

function validateOutput(output: string) {
  const splitOutput: Array<string> = output.split("");

  if (splitOutput[splitOutput.length - 4] === ".") {
    const character = splitOutput[splitOutput.length - 4];
    const index = splitOutput.length - 4;
    const error = new Error(
      `unexpected character ${character} at index ${index} output file name must not contain a '.' or extension like '.mp4', '.gif'`
    );
    throw error;
  }

  if (splitOutput[splitOutput.length - 5] === ".") {
    const character = splitOutput[splitOutput.length - 5];
    const index = splitOutput.length - 5;
    const error = new Error(
      `unexpected character ${character} at index ${index} output file name must not contain a '.' or extension like '.mp4', '.gif'`
    );
    throw error;
  }

  if (splitOutput[0] === ".") {
    const character = splitOutput[0];
    const error = new Error(
      `unexpected character ${character} at index 0 output file name must not contain a '.' or extension like '.mp4', '.gif'`
    );
    throw error;
  }
}

function checkForInputAndOutput(input: string, output: string) {
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
