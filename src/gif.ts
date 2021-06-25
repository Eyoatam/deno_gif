import { ffmpeg, green } from "../deps.ts";

export interface Options {
  width: number;
  height: number;
  videoBitrate?: string;
  audioBitrate?: string;
}

export interface EncodingProgress {
  done: boolean;
  outTimeMs: number;
  frame: number;
  fps: number;
  speed: number;
  progress: number;
}

/**
  * converts videos to the given formats with optional `width` and `height` options
  *
  *
  * Options:
  *
  *  `width` - width of the video
  *
  *  `height` - height of the video
  *
  * @param {string} input - The input file
  * @param {string} output - The output file
  * @param {string} format - The file format convert to
 */
export function convert(
  input: string,
  output: string,
  format: string,
  options?: Options,
) {
  const encoder = ffmpeg(input);

  encoder
    .audioBitrate(
      options?.audioBitrate ? options.audioBitrate : "192k",
    )
    .videoBitrate(
      options?.videoBitrate ? options.videoBitrate : "1M",
    )
    .addEventListener("progress", handleProgress)
    .width(options?.width ? options.width : 480)
    .height(options?.height ? options.height : 380)
    .output("./" + output + "." + format)
    .encode();
}

/** Progress Handler */
export function handleProgress(event: EncodingProgress) {
  if (!event.frame && !event.outTimeMs && !event.fps && !event.speed) {
    console.log(green("[ffmpeg]: ") + `progress ${event.progress}`);
  }
  if (!event.fps && !event.frame) {
    console.log(
      green("[ffmpeg]: ") +
        `time: ${event.outTimeMs}ms  speed: ${event.speed}x`,
    );
  }
  if (event.done) {
    console.log(`✨Done✨ in ${event.outTimeMs}ms`);
  } else {
    console.log(
      green("[ffmpeg]: ") +
        `frame: ${event.frame} fps: ${event.fps} time: ${event.outTimeMs}ms  speed: ${event.speed}x`,
    );
  }
}

/**
   * validates output file name
   * by checking for invalid paths
   *
   * @param {string} output - output file
   */
export function validateOutput(output: string) {
  const splitOutput: string[] = output.split("");
  const splicedOutput: string[] = splitOutput.splice(
    2,
    output.length - 2,
  );
  if (splicedOutput[0] === ".") {
    throw new Error("Invalid path");
  }
  if (splicedOutput.includes(".")) {
    const error = new Error(
      `unexpected character '.' output file name must not contain a '.' or extension like '.mp4', '.gif'`,
    );
    throw error;
  }
  if (splitOutput[0] === "/") {
    const error = new Error(
      `unexpected character '/' output file name must not contain a '/' or extension like '.mp4', '.gif'`,
    );
    throw error;
  }
}

/**
 * Checks if input and output files exist
 * @param {string} input
 * @param {string} output
 */
export function checkForInputAndOutput(input: string, output: string) {
  if (!input) {
    const error = new Error("input file is required");
    throw error;
  }

  if (!output) {
    const error = new Error("output file is required");
    throw error;
  }
}

/**
 * convert `input` video files to `gif` with the given `options`
 * @param {string} input
 * @param {string} output
 * @param {Options} options
 */
export function gif(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);
  // validate output file
  validateOutput(output);

  // convert to gi
  convert(input, output, "gif", options);
}

/**
 * convert `input` video files to `gif` with the given `options`
 * @param {string} input - input file
 * @param {string} output - iutput file
 * @param {Options} options
 */
export function mp4(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to mp4
  convert(input, output, "mp4", options);
}

/**
 * convert `input` video files to `mp3` with the given `options`
 * @param {string} input - input file
 * @param {string} output - output file
 */
export function mp3(input: string, output: string) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to mp3
  convert(input, output, "mp3");
}

/**
 * convert `input` video files to `gif` with the given `options`
 * @param {string} input
 * @param {string} output
 * @param {Options} options
 */
export function avi(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to avi
  convert(input, output, "avi", options);
}

/**
 * convert `input` video files to `gif` with the given `options`
 * @param {string} input
 * @param {string} output
 * @param {Options} options
 */
export function webm(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to webm
  convert(input, output, "webm", options);
}

/**
 * convert `input` video files to `gif` with the given `options`
 * @param {string} input
 * @param {string} output
 * @param {Options} options
 */
export function mov(input: string, output: string, options?: Options) {
  // check if input and output files exist
  checkForInputAndOutput(input, output);

  // validate output file
  validateOutput(output);

  // convert to webm
  convert(input, output, "mov", options);
}
