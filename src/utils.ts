import { colorsTs, ffmpegTs } from "../deps/mod.ts";
import { EncodingProgress, Options } from "../types/types.ts";

export default class Helper {
  /**
   * convergs videos to other formats of videos with the given options
   *
   *
   * Options:
   *
   *  `width` - width of the video
   *
   *  `height` - height of the video
   *
   * @param input - The input file
   * @param output - The output file
   * @param format - The file format convert to
   */
  convert(input: string, output: string, format: string, options?: Options) {
    const encoder = ffmpegTs.ffmpeg(input);

    encoder
      .audioBitrate("192k")
      .videoBitrate("1M")
      .addEventListener("progress", this.handleProgress)
      .width(options ? options?.width : 480)
      .height(options ? options?.height : 380)
      .output("./" + output + "." + format)
      .encode();
  }

  /** Progress Handler */
  handleProgress(event: EncodingProgress) {
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
   * validates output file name
   * by checking for invalid paths
   *
   * @param output - output file
   */
  validateOutput(output: string) {
    const splitOutput: Array<string> = output.split("");
    const splicedOutput: Array<string> = splitOutput.splice(
      2,
      output.length - 2
    );
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

  /** Checks if input and output files exist  */
  checkForInputAndOutput(input: string, output: string) {
    if (!input) {
      const error = new Error("input file is required");
      throw error;
    }

    if (!output) {
      const error = new Error("output file is required");
      throw error;
    }
  }
}
