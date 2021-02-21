import { colorsTs, ffmpegTs } from "../deps/mod.ts";
import { EncodingProgress, Options } from "../types/types.ts";

// Handlers
function validateOutput(output: string) {
  const splitOutput: Array<string> = output.split("");
  const splicedOutput: Array<string> = splitOutput.splice(2, output.length - 2);
  if (splicedOutput[0] === ".") {
    throw new Error("Invalid path");
  }
  if (splicedOutput.includes(".")) {
    const error = new Error(
      `unexpected character '.' output file name must not contain a '.' or extension like '.mp4', '.gif'`
    );
    throw error;
  }
  if (splitOutput[0] === "/") {
    const error = new Error(
      `unexpected character '/' output file name must not contain a '/' or extension like '.mp4', '.gif'`
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

/**
 * convert `input` video files to `.gif` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function gif(input: string, output: string, options?: Options) {
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
    .width(options ? options?.width : 480)
    .height(options ? options?.height : 380)
    .output("./" + output + ".gif")
    .encode();
}

/**
 * convert `input` video files to `.mp4` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function mp4(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to mp4
  const encoder = ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", handleProgress)
    .width(options ? options?.width : 480)
    .height(options ? options?.height : 380)
    .output("./" + output + ".mp4")
    .encode();
}

/**
 * convert `input` video files to `.mp3` with the given `options`
 * @param input @type string
 * @param output @type string
 */
export function mp3(input: string, output: string) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to mp3
  const encoder = ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", handleProgress)
    .output("./" + output + ".mp3")
    .encode();
}

/**
 * convert `input` video files to `.avi` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function avi(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to avi
  const encoder = ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", handleProgress)
    .width(options ? options?.width : 480)
    .height(options ? options?.height : 380)
    .output("./" + output + ".avi")
    .encode();
}

/**
 * convert `input` video files to `.webm` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function webm(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to avi
  const encoder = ffmpegTs.ffmpeg(input);

  encoder
    .audioBitrate("192k")
    .videoBitrate("1M")
    .addEventListener("progress", handleProgress)
    .width(options ? options?.width : 480)
    .height(options ? options?.height : 380)
    .output("./" + output + ".webm")
    .encode();
}
