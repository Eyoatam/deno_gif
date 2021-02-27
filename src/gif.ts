import { Options } from "../types/types.ts";
import Helper from "./utils.ts";
const Handler = new Helper();

/**
 * convert `input` video files to `gif` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function gif(input: string, output: string, options?: Options) {
  // check if input and output files exist
  Handler.checkForInputAndOutput(input, output);

  // validate output file
  Handler.validateOutput(output);

  // convert to gif
  Handler.convert(input, output, "gif", options);
}

/**
 * convert `input` video files to `mp4` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function mp4(input: string, output: string, options?: Options) {
  // check if input and output files exist
  Handler.checkForInputAndOutput(input, output);

  // validate output file
  Handler.validateOutput(output);

  // convert to mp4
  Handler.convert(input, output, "mp4", options);
}

/**
 * convert `input` video files to `mp3` with the given `options`
 * @param input @type string
 * @param output @type string
 */
export function mp3(input: string, output: string) {
  // check if input and output files exist
  Handler.checkForInputAndOutput(input, output);

  // validate output file
  Handler.validateOutput(output);

  // convert to mp3
  Handler.convert(input, output, "mp3");
}

/**
 * convert `input` video files to `avi` with the given `options`
 * @param input @type string
 * @param output @type string
 * @param width @default 480
 * @param height @default 380
 */
export function avi(input: string, output: string, options?: Options) {
  // check if input and output files exist
  Handler.checkForInputAndOutput(input, output);

  // validate output file
  Handler.validateOutput(output);

  // convert to avi
  Handler.convert(input, output, "avi", options);
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
  Handler.checkForInputAndOutput(input, output);

  // validate output file
  Handler.validateOutput(output);

  // convert to webm
  Handler.convert(input, output, "webm", options);
}
