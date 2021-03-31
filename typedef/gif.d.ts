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
export declare class Handler {
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
   * @param input - The input file
   * @param output - The output file
   * @param format - The file format convert to
   */
  convert(
    input: string,
    output: string,
    format: string,
    options?: Options,
  ): void;
  /** Progress Handler */
  handleProgress(event: EncodingProgress): void;
  /**
   * validates output file name
   * by checking for invalid paths
   *
   * @param output - output file
   */
  validateOutput(output: string): void;
  /**
   * Checks if input and output files exist
   * @param input
   * @param output
   *  */
  checkForInputAndOutput(input: string, output: string): void;
}
/**
 * convert `input` video files to `gif` with the given `options`
 * @param input - input file name
 * @param output - output file name
 * @param options - video options like width and height
 */
export declare function gif(
  input: string,
  output: string,
  options?: Options,
): void;
/**
 * convert `input` video files to `gif` with the given `options`
 * @param input - input file name
 * @param output - output file name
 * @param options - video options like width and height
 */
export declare function mp4(
  input: string,
  output: string,
  options?: Options,
): void;
/**
 * convert `input` video files to `gif` with the given `options`
 * @param input - input file name
 * @param output - output file name
 */
export declare function mp3(input: string, output: string): void;
/**
 * convert `input` video files to `gif` with the given `options`
 * @param input - input file name
 * @param output - output file name
 * @param options - video options like width and height
 */
export declare function avi(
  input: string,
  output: string,
  options?: Options,
): void;
/**
 * convert `input` video files to `gif` with the given `options`
 * @param input - input file name
 * @param output - output file name
 * @param options - video options like width and height
 */
export declare function webm(
  input: string,
  output: string,
  options?: Options,
): void;
/**
 * convert `input` video files to `gif` with the given `options`
 * @param input - input file name
 * @param output - output file name
 * @param options - video options like width and height
 */
export declare function mov(
  input: string,
  output: string,
  options?: Options,
): void;
