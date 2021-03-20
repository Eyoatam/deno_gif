class FFmpegBaseParameters {
  #opts;
  constructor(opts1) {
    this.#opts = opts1;
  }
  get opts() {
    return this.#opts;
  }
  set opts(options) {
    this.#opts = options;
  }
  get format() {
    return this.opts.format;
  }
  set format(format) {
    this.opts.format = format;
  }
  get codec() {
    return this.opts.codec;
  }
  set codec(codec) {
    this.opts.codec = codec;
  }
  get audioCodec() {
    return this.opts.audioCodec;
  }
  set audioCodec(audioCodec) {
    this.opts.audioCodec = audioCodec;
  }
  get videoCodec() {
    return this.opts.videoCodec;
  }
  set videoCodec(videoCodec) {
    this.opts.videoCodec = videoCodec;
  }
  get frameRate() {
    return this.opts.frameRate;
  }
  set frameRate(frameRate) {
    this.opts.frameRate = frameRate;
  }
  get sampleRate() {
    return this.opts.sampleRate;
  }
  set sampleRate(sampleRate) {
    this.opts.sampleRate = sampleRate;
  }
  get audioChannels() {
    return this.opts.audioChannels;
  }
  set audioChannels(count) {
    this.opts.audioChannels = count;
  }
  get duration() {
    return this.opts.duration;
  }
  set duration(duration) {
    this.opts.duration = duration;
  }
  get noVideo() {
    return !!this.opts.noVideo;
  }
  set noVideo(disable) {
    this.opts.noVideo = disable;
  }
  get noAudio() {
    return !!this.opts.noAudio;
  }
  set noAudio(disable) {
    this.opts.noAudio = disable;
  }
  get args() {
    return this.opts.args;
  }
  set args(ffmpegArgs) {
    this.opts.args = ffmpegArgs;
  }
  merge(parameters) {
    Object.assign(this.opts, parameters.opts);
    return this;
  }
  rebase(parameters) {
    Object.assign(this.opts, parameters.opts, this.opts);
    return this;
  }
}
const noColor = globalThis.Deno?.noColor ?? true;
let enabled = !noColor;
function code(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run1(str, code1) {
  return enabled
    ? `${code1.open}${str.replace(code1.regexp, code1.open)}${code1.close}`
    : str;
}
function bold(str) {
  return run1(
    str,
    code([
      1,
    ], 22),
  );
}
function red(str) {
  return run1(
    str,
    code([
      31,
    ], 39),
  );
}
const ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|"),
  "g",
);
class FFprobeError extends Error {
  constructor(message, options13) {
    super(getFFprobeErrorMessage(message, options13));
    this.name = "FFprobeError";
    Object.setPrototypeOf(this, FFprobeError.prototype);
  }
}
class FFprobeBinaryNotFound extends FFprobeError {
  constructor(options1) {
    super("FFprobe binary not found.", options1);
    this.name = "FFprobeBinaryNotFound";
    Object.setPrototypeOf(this, FFprobeBinaryNotFound.prototype);
  }
}
class FFprobeBinaryPermissionDenied extends FFprobeError {
  constructor(options2) {
    super("FFprobe binary not executable.", options2);
    this.name = "FFprobeBinaryPermissionDenied";
    Object.setPrototypeOf(this, FFprobeBinaryPermissionDenied.prototype);
  }
}
class FFprobeCommandFailed extends FFprobeError {
  constructor(options3) {
    super("FFprobe command failed.", options3);
    this.name = "FFprobeCommandFailed";
    Object.setPrototypeOf(this, FFprobeCommandFailed.prototype);
  }
}
class FFmpegError extends Error {
  constructor(message1, options4) {
    super(getFFmpegErrorMessage(message1, options4));
    this.name = "FFmpegError";
    Object.setPrototypeOf(this, FFmpegError.prototype);
  }
}
class FFmpegBinaryNotFound extends FFmpegError {
  constructor(options5) {
    super("FFmpeg binary not found.", options5);
    this.name = "FFmpegBinaryNotFound";
    Object.setPrototypeOf(this, FFmpegBinaryNotFound.prototype);
  }
}
class FFmpegBinaryPermissionDenied extends FFmpegError {
  constructor(options6) {
    super("FFmpeg binary not executable.", options6);
    this.name = "FFmpegBinaryPermissionDenied";
    Object.setPrototypeOf(this, FFmpegBinaryPermissionDenied.prototype);
  }
}
class FFmpegCommandFailed extends FFmpegError {
  constructor(options7) {
    super("FFmpeg command failed.", options7);
    this.name = "FFmpegCommandFailed";
    Object.setPrototypeOf(this, FFmpegCommandFailed.prototype);
  }
}
class FFmpegCommandStatusFailed extends FFmpegError {
  constructor(options8) {
    super("Failed to retrieve ffmpeg command status.", options8);
    this.name = "FFmpegCommandFailed";
    Object.setPrototypeOf(this, FFmpegCommandFailed.prototype);
  }
}
class EncodingProcessNotStarted extends FFmpegError {
  constructor(options9) {
    super(
      "Encoding process not started. Use 'EncodingProcess.run()' to start the encoding process.",
      options9,
    );
    this.name = "EncodingProcessNotStarted";
    Object.setPrototypeOf(this, EncodingProcessNotStarted.prototype);
  }
}
class EncodingProcessAlreadyStarted extends FFmpegError {
  constructor(options10) {
    super("EncodingProcess.run() called multiple times.", options10);
    this.name = "EncodingProcessAlreadyStarted";
    Object.setPrototypeOf(this, EncodingProcessAlreadyStarted.prototype);
  }
}
class EncodingEventStreamAlreadyDisposed extends FFmpegError {
  constructor(options11) {
    super("EncodingProcess.dispose() called multiple times.", options11);
    this.name = "EncodingProcessAlreadyDisposed";
    Object.setPrototypeOf(this, EncodingEventStreamAlreadyDisposed.prototype);
  }
}
function getFFprobeErrorMessage(
  message2,
  { inputFile, status, stderrOutput, cmd, previous, binary, cwd },
) {
  message2 = red(message2);
  message2 += `\n`;
  if (status) {
    message2 += `\n  ${bold("Exit code:")} ${Deno.inspect(status.code)}`;
    if (typeof status?.signal === "number") {
      message2 += `\n  ${bold("Signal:")} ${Deno.inspect(status.signal)}`;
    }
  }
  message2 += `\n  ${bold("FFprobe binary:")} ${Deno.inspect(binary)}`;
  message2 += `\n  ${bold("Input file:")} ${Deno.inspect(inputFile)}`;
  message2 += `\n  ${bold("Working directory:")} ${
    Deno.inspect(cwd ?? Deno.cwd())
  }`;
  if (cmd) {
    message2 += `\n  ${bold("FFprobe command:")} ${
      Deno.inspect(cmd.join(" "))
    }`;
  }
  if (previous) {
    message2 += `\n  ${bold("Original error:")} ${
      Deno.inspect(previous.toString())
    }`;
  }
  message2 += `\n`;
  if (stderrOutput) {
    const errorMessage = new TextDecoder().decode(stderrOutput);
    message2 += `\n${red(errorMessage.trim())}\n`;
  }
  return message2;
}
function getFFmpegErrorMessage(
  message2,
  { encoding, status, stderrOutput, cmd, previous },
) {
  message2 = red(message2);
  message2 += `\n`;
  if (status) {
    message2 += `\n  ${bold("Exit code:")} ${Deno.inspect(status.code)}`;
    if (typeof status?.signal === "number") {
      message2 += `\n  ${bold("Signal:")} ${Deno.inspect(status.signal)}`;
    }
  }
  message2 += `\n  ${bold("FFmpeg binary:")} ${Deno.inspect(encoding.binary)}`;
  message2 += `\n  ${bold("Input file:")} ${Deno.inspect(encoding.input)}`;
  message2 += `\n  ${bold("Output file:")} ${Deno.inspect(encoding.output)}`;
  message2 += `\n  ${bold("Working directory:")} ${
    Deno.inspect(encoding.cwd ?? Deno.cwd())
  }`;
  if (cmd) {
    message2 += `\n  ${bold("FFmpeg command:")} ${Deno.inspect(cmd.join(" "))}`;
  }
  if (previous) {
    message2 += `\n  ${bold("Original error:")} ${
      Deno.inspect(previous.toString())
    }`;
  }
  message2 += `\n`;
  if (stderrOutput) {
    const errorMessage = new TextDecoder().decode(stderrOutput);
    message2 += `\n${red(errorMessage.trim())}\n`;
  }
  return message2;
}
class FFmpegInputParameters extends FFmpegBaseParameters {
  constructor(options12 = {}) {
    super(options12);
  }
  clone() {
    return new FFmpegInputParameters().merge(this);
  }
  get options() {
    return this.opts;
  }
  set options(options) {
    this.opts = options;
  }
}
class AbstractFFmpegOutputParameters extends FFmpegBaseParameters {
  constructor(options14 = {}) {
    super(options14);
  }
  get override() {
    return this.opts.override;
  }
  set override(enable) {
    this.opts.override = enable;
  }
  get audioBitrate() {
    return this.opts.audioBitrate;
  }
  set audioBitrate(audioBitrate) {
    this.opts.audioBitrate = audioBitrate;
  }
  get videoBitrate() {
    return this.opts.videoBitrate;
  }
  set videoBitrate(videoBitrate) {
    this.opts.videoBitrate = videoBitrate;
  }
  get minVideoBitrate() {
    return this.opts.minVideoBitrate;
  }
  set minVideoBitrate(bitrate) {
    this.opts.minVideoBitrate = bitrate;
  }
  get maxVideoBitrate() {
    return this.opts.maxVideoBitrate;
  }
  set maxVideoBitrate(bitrate) {
    this.opts.maxVideoBitrate = bitrate;
  }
  get videoBufSize() {
    return this.opts.videoBufSize;
  }
  set videoBufSize(size) {
    this.opts.videoBufSize = size;
  }
  get width() {
    return this.opts.width;
  }
  set width(width) {
    this.opts.width = width;
  }
  get height() {
    return this.opts.height;
  }
  set height(height) {
    this.opts.height = height;
  }
  get frames() {
    return this.opts.frames;
  }
  set frames(frames) {
    this.opts.frames = frames;
  }
  get audioQuality() {
    return this.opts.audioQuality;
  }
  set audioQuality(audioQuality) {
    this.opts.audioQuality = audioQuality;
  }
  get loop() {
    return this.opts.loop;
  }
  set loop(loop) {
    this.opts.loop = loop;
  }
}
class FFmpegOutputParameters extends AbstractFFmpegOutputParameters {
  get options() {
    return this.opts;
  }
  set options(options) {
    this.opts = options;
  }
  clone() {
    return new FFmpegOutputParameters().merge(this);
  }
}
class Encoding extends AbstractFFmpegOutputParameters {
  #options = {
    binary: "ffmpeg",
    input: "pipe:0",
    output: "pipe:1",
  };
  #input = new FFmpegInputParameters();
  #output = new FFmpegOutputParameters();
  #eventListeners = [];
  constructor(options15 = {}) {
    super();
    Object.assign(this.#options, options15);
  }
  get opts() {
    return this.#output.options;
  }
  set opts(options) {
    this.#output.options = options;
  }
  get options() {
    return this.#options;
  }
  get inputOptions() {
    return this.#input;
  }
  get outputOptions() {
    return this.#output;
  }
  get input() {
    return this.#options.input;
  }
  set input(source) {
    this.#options.input = source;
  }
  get output() {
    return this.#options.output;
  }
  set output(path) {
    this.#options.output = path;
  }
  get cwd() {
    return this.#options.cwd;
  }
  set cwd(path) {
    this.#options.cwd = path;
  }
  get threads() {
    return this.#options.threads;
  }
  set threads(path) {
    this.#options.threads = path;
  }
  get binary() {
    return this.#options.binary;
  }
  set binary(ffmpeg) {
    this.#options.binary = ffmpeg;
  }
  get logLevel() {
    return this.#options.logLevel;
  }
  set logLevel(logLevel) {
    this.#options.logLevel = logLevel;
  }
  merge(encoding) {
    Object.assign(this.#options, encoding.#options);
    this.#input.merge(encoding.#input);
    this.#output.merge(encoding.#output);
    this.#eventListeners.push(...encoding.#eventListeners);
    return this;
  }
  rebase(encoding) {
    this.#options = Object.assign({}, encoding.#options, this.#options);
    this.#input.rebase(encoding.#input);
    this.#output.rebase(encoding.#output);
    this.#eventListeners = [
      ...encoding.#eventListeners,
      ...this.#eventListeners,
    ];
    return this;
  }
  clone() {
    return new Encoding().merge(this);
  }
  addEventListener(event, listener) {
    this.#eventListeners.push({
      type: event,
      listener,
    });
    return this;
  }
  removeEventListener(event, listener) {
    const index = this.#eventListeners.findIndex((item) =>
      item.type === event && item.listener === listener
    );
    if (index !== -1) {
      this.#eventListeners.splice(index, 1);
    }
    return this;
  }
  removeAllListeners() {
    this.#eventListeners = [];
    return this;
  }
  emit(name, event) {
    for (const { type, listener } of this.#eventListeners) {
      if (type === name) {
        listener(event);
      }
    }
  }
}
class EncodingEventStream {
  #disposed = false;
  #pullQueue = [];
  #pushQueue = [];
  #encodingProcess;
  #encoding;
  #done = false;
  constructor(process) {
    this.#encodingProcess = process;
    this.#encoding = process.encoding;
    this.#encoding.addEventListener("start", this.#pushEvent);
    this.#encoding.addEventListener("info", this.#pushEvent);
    this.#encoding.addEventListener("progress", this.#pushEvent);
    this.#encoding.addEventListener("end", this.#pushEvent);
    this.#encoding.addEventListener("error", this.#pushEvent);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  dispose = () => {
    if (this.#disposed) {
      throw new EncodingEventStreamAlreadyDisposed({
        encoding: this.#encoding,
      });
    }
    this.#encoding.removeEventListener("start", this.#pushEvent);
    this.#encoding.removeEventListener("info", this.#pushEvent);
    this.#encoding.removeEventListener("progress", this.#pushEvent);
    this.#encoding.removeEventListener("end", this.#pushEvent);
    this.#encoding.removeEventListener("error", this.#pushEvent);
    this.#disposed = true;
    if (this.#pullQueue.length > 0) {
      const { resolve } = this.#pullQueue[0];
      this.#pullQueue.shift();
      resolve(null);
    }
  };
  async next() {
    if (!this.#encodingProcess.pid) {
      throw new EncodingProcessNotStarted({
        encoding: this.#encoding,
      });
    }
    if (this.#done) {
      await this.#encodingProcess.status();
      this.dispose();
      return {
        done: true,
        value: undefined,
      };
    }
    const event = await this.#pullEvent();
    if (!event) {
      return {
        done: true,
        value: undefined,
      };
    }
    if (event.type === "end" || event.type === "error") {
      this.#done = true;
    }
    return {
      done: false,
      value: event,
    };
  }
  #pushEvent = (event) => {
    if (this.#pullQueue.length > 0) {
      const { resolve } = this.#pullQueue.shift();
      resolve(event);
    } else {
      this.#pushQueue.push(event);
    }
  };
  #pullEvent = () => {
    return new Promise((resolve, reject) => {
      if (this.#pushQueue.length > 0) {
        const event = this.#pushQueue[0];
        this.#pushQueue.shift();
        resolve(event);
      } else {
        this.#pullQueue.push({
          resolve,
          reject,
        });
      }
    });
  };
}
class AbstractEncodingEvent {
  #encoding;
  constructor(name16, encoding) {
    this.type = name16;
    this.#encoding = encoding;
  }
  get encoding() {
    return this.#encoding;
  }
}
class EncodingInfoEvent extends AbstractEncodingEvent {
  #info;
  constructor(encoding1, info) {
    super("info", encoding1);
    this.#info = info;
  }
  get info() {
    return this.#info;
  }
}
class EncodingStartEvent extends AbstractEncodingEvent {
  constructor(encoding2) {
    super("start", encoding2);
  }
}
class EncodingProgressEvent extends AbstractEncodingEvent {
  constructor(encoding3, progress, info1) {
    super("progress", encoding3);
    this.frame = parseInt(info1.frame);
    this.fps = parseFloat(info1.fps);
    this.bitrate = info1.bitrate;
    this.totalSize = parseInt(info1.total_size);
    this.outTimeMs = parseInt(info1.out_time_ms);
    this.outTime = info1.out_time;
    this.dupFrames = parseInt(info1.dup_frames);
    this.dropFrames = parseInt(info1.drop_frames);
    this.speed = parseFloat(info1.speed);
    this.progress = progress;
    this.done = info1.progress === "end";
  }
}
class EncodingEndEvent extends AbstractEncodingEvent {
  constructor(encoding4) {
    super("end", encoding4);
  }
}
class EncodingErrorEvent extends AbstractEncodingEvent {
  constructor(encoding5, error1) {
    super("error", encoding5);
    this.error = error1;
  }
}
class FFmpegCommand {
  #args = [];
  constructor(encoding6, silent) {
    this.#setOptions(encoding6, silent);
  }
  toArray() {
    return this.#args;
  }
  #setOptions = (encoding7, silent1) => {
    this.#args.push(encoding7.binary, "-hide_banner");
    this.#setInputOptions(encoding7.inputOptions);
    this.#args.push("-i", encoding7.input);
    if (!silent1) {
      !silent1 && this.#args.push("-progress", "-", "-nostats");
    }
    if (encoding7.threads) {
      this.#args.push("-threads", encoding7.threads.toString());
    }
    if (encoding7.logLevel) {
      this.#args.push("-loglevel", encoding7.logLevel);
    }
    this.#setOutputOptions(encoding7.outputOptions);
    if (encoding7.output) {
      this.#args.push(encoding7.output);
    }
  };
  #setInputOptions = (options16) => {
    this.#setBaseOptions(options16);
  };
  #setOutputOptions = (options16) => {
    this.#args.push(options16.override ? "-y" : "-n");
    if (options16.audioBitrate) {
      let audioBitrate = options16.audioBitrate.toString();
      if (!isNaN(Number(audioBitrate))) {
        audioBitrate += "k";
      }
      this.#args.push("-b:a", audioBitrate);
    }
    if (options16.videoBitrate) {
      let videoBitrate = options16.videoBitrate.toString();
      if (!isNaN(Number(videoBitrate))) {
        videoBitrate += "k";
      }
      this.#args.push("-b:v", videoBitrate);
    }
    if (options16.minVideoBitrate) {
      this.#args.push("-minrate", options16.minVideoBitrate.toString());
    }
    if (options16.maxVideoBitrate) {
      this.#args.push("-maxrate", options16.maxVideoBitrate.toString());
    }
    if (options16.videoBufSize) {
      this.#args.push("-bufsize", options16.videoBufSize.toString());
    }
    if (options16.frames) {
      this.#args.push("-vframes", options16.frames.toString());
    }
    if (options16.audioQuality) {
      this.#args.push("-q:a", options16.audioQuality.toString());
    }
    if (options16.loop) {
      this.#args.push("-loop", options16.loop.toString());
    }
    if (options16.width || options16.height) {
      const width = options16.width ?? -1;
      const height = options16.height ?? -1;
      this.#args.push("-vf", `scale=${width}:${height}`);
    }
    this.#setBaseOptions(options16);
  };
  #setBaseOptions = (options16) => {
    if (options16.audioChannels) {
      this.#args.push("-ac", options16.audioChannels.toString());
    }
    if (options16.audioCodec) {
      this.#args.push("-acodec", options16.audioCodec);
    }
    if (options16.codec) {
      this.#args.push("-codec", options16.codec);
    }
    if (options16.duration) {
      this.#args.push("-t", options16.duration.toString());
    }
    if (options16.format) {
      this.#args.push("-f", options16.format);
    }
    if (options16.frameRate) {
      this.#args.push("-r", options16.frameRate.toString());
    }
    if (options16.noAudio) {
      this.#args.push("-an");
    }
    if (options16.noVideo) {
      this.#args.push("-vn");
    }
    if (options16.sampleRate) {
      this.#args.push("-ar", options16.sampleRate.toString());
    }
    if (options16.videoCodec) {
      this.#args.push("-vcodec", options16.videoCodec);
    }
    if (options16.args) {
      this.#args.push(...options16.args);
    }
  };
}
async function ffprobe(input, { cwd, binary, args }) {
  if (!binary) {
    binary = "ffprobe";
  }
  if (!args) {
    args = [];
  }
  const cmd = [
    binary,
    "-hide_banner",
    "-print_format",
    "json",
    "-show_format",
    "-show_streams",
    ...args,
    input,
  ];
  let process1;
  try {
    process1 = Deno.run({
      cmd,
      cwd,
      stdout: "piped",
      stderr: "piped",
    });
  } catch (error1) {
    if (error1 instanceof Deno.errors.NotFound) {
      throw new FFprobeBinaryNotFound({
        binary,
        cwd,
        inputFile: input,
        cmd,
        previous: error1,
      });
    } else if (error1 instanceof Deno.errors.PermissionDenied) {
      throw new FFprobeBinaryPermissionDenied({
        binary,
        cwd,
        inputFile: input,
        cmd,
        previous: error1,
      });
    }
    throw error1;
  }
  const status = await process1.status();
  if (!status.success) {
    process1.stdout?.close();
    process1.close();
    throw new FFprobeCommandFailed({
      binary,
      cwd,
      inputFile: input,
      cmd,
      status,
      stderrOutput: await process1.stderrOutput(),
    });
  }
  const output = await process1.output();
  process1.stderr?.close();
  process1.close();
  return JSON.parse(new TextDecoder().decode(output));
}
class EncodingProcess {
  #encoding;
  #process;
  #info;
  #statusPromise;
  #outputPromise;
  #stderrOutputPromise;
  #eventIterator;
  #cmd;
  constructor(encoding7) {
    this.#encoding = encoding7;
    this.#eventIterator = new EncodingEventStream(this);
  }
  [Symbol.asyncIterator]() {
    return this.#eventIterator;
  }
  get encoding() {
    return this.#encoding;
  }
  get pid() {
    return this.#process?.pid;
  }
  get rid() {
    return this.#process?.rid;
  }
  get stdin() {
    return this.#process?.stdin ?? undefined;
  }
  get stdout() {
    return this.#process?.stdout ?? undefined;
  }
  get stderr() {
    return this.#process?.stderr ?? undefined;
  }
  get process() {
    if (!this.#process) {
      throw new EncodingProcessNotStarted({
        encoding: this.#encoding,
      });
    }
    return this.#process;
  }
  run = () => {
    if (this.#process) {
      throw new EncodingProcessAlreadyStarted({
        encoding: this.#encoding,
        cmd: this.#cmd,
      });
    }
    this.#cmd = new FFmpegCommand(this.#encoding, this.#isOutputStream())
      .toArray();
    const opts1 = {
      cmd: this.#cmd,
      cwd: this.#encoding.cwd,
      stdin: "piped",
      stdout: "piped",
      stderr: "piped",
    };
    try {
      this.#process = Deno.run(opts1);
    } catch (error1) {
      if (error1 instanceof Deno.errors.NotFound) {
        throw new FFmpegBinaryNotFound({
          encoding: this.#encoding,
          cmd: this.#cmd,
          previous: error1,
        });
      } else if (error1 instanceof Deno.errors.PermissionDenied) {
        throw new FFmpegBinaryPermissionDenied({
          encoding: this.#encoding,
          cmd: this.#cmd,
          previous: error1,
        });
      }
      throw error1;
    }
    void this.#initEvents();
    return this;
  };
  status = () => {
    if (!this.#statusPromise) {
      this.#statusPromise = new Promise((resolve, reject) => {
        try {
          this.process.status().then(resolve).catch(reject);
        } catch (e) {
          reject(e);
        }
      });
    }
    return this.#statusPromise;
  };
  output = () => {
    if (!this.#outputPromise) {
      this.#outputPromise = new Promise((resolve, reject) => {
        try {
          this.process.output().then(resolve).catch(reject);
        } catch (e) {
          reject(e);
        }
      });
    }
    return this.#outputPromise;
  };
  stderrOutput = () => {
    if (!this.#stderrOutputPromise) {
      this.#stderrOutputPromise = new Promise((resolve, reject) => {
        try {
          this.process.stderrOutput().then(resolve).catch(reject);
        } catch (e) {
          reject(e);
        }
      });
    }
    return this.#stderrOutputPromise;
  };
  kill = async (signo) => {
    await this.process.kill(signo);
  };
  close() {
    try {
      this.process.stdin?.close();
    } catch {
    }
    try {
      this.process.stdout?.close();
    } catch {
    }
    try {
      this.process.stderr?.close();
    } catch {
    }
    try {
      this.process.close();
    } catch {
    }
  }
  #initEvents = async () => {
    this.#encoding.emit("start", new EncodingStartEvent(this.#encoding));
    if (!this.#encoding.input) {
      return;
    }
    this.#info = await ffprobe(this.#encoding.input, {
      cwd: this.#encoding.cwd,
    });
    this.#encoding.emit(
      "info",
      new EncodingInfoEvent(this.#encoding, this.#info),
    );
    this.status().then(async (status) => {
      if (!status.success) {
        const error1 = new FFmpegCommandFailed({
          encoding: this.#encoding,
          status,
          stderrOutput: this.#process && await this.stderrOutput(),
          cmd: this.#cmd,
        });
        const errorEvent = new EncodingErrorEvent(this.#encoding, error1);
        this.#encoding.emit("error", errorEvent);
      }
    }).catch(async (err) => {
      const error1 = new FFmpegCommandStatusFailed({
        encoding: this.#encoding,
        stderrOutput: this.#process && await this.stderrOutput(),
        cmd: this.#cmd,
        previous: err,
      });
      const errorEvent = new EncodingErrorEvent(this.#encoding, error1);
      this.#encoding.emit("error", errorEvent);
    });
    if (this.#isOutputStream()) {
      return;
    }
    if (this.process.stdout) {
      const videoStream = this.#info.streams.find((stream) =>
        stream.codec_type === "video"
      );
      const totalFrames = parseInt(videoStream.nb_frames);
      for await (const chunk of Deno.iter(this.process.stdout)) {
        const progressInfo = parseProgressOutput(chunk);
        const frames = parseInt(progressInfo.frame);
        const progress1 = Math.trunc(100 / (totalFrames / frames));
        const event = new EncodingProgressEvent(
          this.#encoding,
          progress1,
          progressInfo,
        );
        this.#encoding.emit("progress", event);
      }
    }
    const status = await this.status();
    if (status.success) {
      this.#encoding.emit("end", new EncodingEndEvent(this.#encoding));
    }
  };
  #isOutputStream = () => {
    return !this.#encoding.output || this.#encoding.output === "-" ||
      this.#encoding.output.startsWith("pipe:");
  };
}
function parseProgressOutput(chunk) {
  return new TextDecoder().decode(chunk).trim().split("\n").map((line) =>
    line.split("=")
  ).reduce((previous, current) => {
    previous[current[0]] = current[1];
    return previous;
  }, {});
}
function ffmpeg1(input, options16) {
  return new FFmpeg(input, options16);
}
class FFmpeg {
  #global = new Encoding();
  #encodings = [];
  #encodingIndex = -1;
  #iteratorCount = 0;
  get encoding() {
    if (this.#encodingIndex === -1) {
      return this.#global;
    }
    return this.#encodings[this.#encodingIndex];
  }
  get encodings() {
    return this.#encodings;
  }
  constructor(input1, options16 = {}) {
    if (input1) {
      this.encoding.input = input1;
    }
    if (typeof options16 === "string") {
      this.encoding.output = options16;
    }
    Object.assign(this.encoding, options16);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  input(source) {
    this.encoding.input = source;
    return this;
  }
  output(target) {
    this.#addEncoding();
    this.encoding.output = target;
    return this;
  }
  binary(ffmpeg) {
    this.encoding.binary = ffmpeg;
    return this;
  }
  cwd(path) {
    this.encoding.cwd = path;
    return this;
  }
  threads(count) {
    this.encoding.threads = count;
    return this;
  }
  logLevel(logLevel) {
    this.encoding.logLevel = logLevel;
    return this;
  }
  args(ffmpegArgs) {
    this.encoding.args = ffmpegArgs;
    return this;
  }
  inputArgs(ffmpegArgs) {
    this.encoding.inputOptions.args = ffmpegArgs;
    return this;
  }
  audioChannels(count) {
    this.encoding.audioChannels = count;
    return this;
  }
  inputAudioChannels(count) {
    this.encoding.inputOptions.audioChannels = count;
    return this;
  }
  audioCodec(codec) {
    this.encoding.audioCodec = codec;
    return this;
  }
  inputAudioCodec(codec) {
    this.encoding.inputOptions.audioCodec = codec;
    return this;
  }
  codec(codec) {
    this.encoding.codec = codec;
    return this;
  }
  inputCodec(codec) {
    this.encoding.inputOptions.codec = codec;
    return this;
  }
  duration(duration) {
    this.encoding.duration = duration;
    return this;
  }
  inputDuration(duration) {
    this.encoding.inputOptions.duration = duration;
    return this;
  }
  format(format) {
    this.encoding.format = format;
    return this;
  }
  inputFormat(format) {
    this.encoding.inputOptions.format = format;
    return this;
  }
  frameRate(frameRate) {
    this.encoding.frameRate = frameRate;
    return this;
  }
  inputFrameRate(frameRate) {
    this.encoding.inputOptions.frameRate = frameRate;
    return this;
  }
  noAudio(disable = true) {
    this.encoding.noAudio = disable;
    return this;
  }
  noInputAudio(disable = true) {
    this.encoding.inputOptions.noAudio = disable;
    return this;
  }
  noVideo(disable = true) {
    this.encoding.noVideo = disable;
    return this;
  }
  noInputVideo(disable = true) {
    this.encoding.inputOptions.noVideo = disable;
    return this;
  }
  sampleRate(hz) {
    this.encoding.sampleRate = hz;
    return this;
  }
  inputSampleRate(hz) {
    this.encoding.inputOptions.sampleRate = hz;
    return this;
  }
  videoCodec(codec) {
    this.encoding.videoCodec = codec;
    return this;
  }
  inputVideoCodec(codec) {
    this.encoding.inputOptions.videoCodec = codec;
    return this;
  }
  audioBitrate(bitrate) {
    this.encoding.audioBitrate = bitrate;
    return this;
  }
  audioQuality(quality) {
    this.encoding.audioQuality = quality;
    return this;
  }
  frames(frames) {
    this.encoding.frames = frames;
    return this;
  }
  height(height) {
    this.encoding.height = height;
    return this;
  }
  loop(loops) {
    this.encoding.loop = loops;
    return this;
  }
  maxVideoBitrate(bitrate) {
    this.encoding.maxVideoBitrate = bitrate;
    return this;
  }
  minVideoBitrate(bitrate) {
    this.encoding.minVideoBitrate = bitrate;
    return this;
  }
  override(enable) {
    this.encoding.override = enable;
    return this;
  }
  videoBitrate(bitrate) {
    this.encoding.videoBitrate = bitrate;
    return this;
  }
  videoBufSize(size) {
    this.encoding.videoBufSize = size;
    return this;
  }
  width(width) {
    this.encoding.width = width;
    return this;
  }
  addEventListener(event, listener) {
    this.encoding.addEventListener(event, listener);
    return this;
  }
  async encode() {
    for await (const process1 of this) {
      process1.run();
      for await (const event of process1) {
        if (event.type === "error") {
          process1.close();
          throw event.error;
        }
      }
      process1.close();
    }
  }
  next() {
    if (this.#iteratorCount < this.#encodings.length) {
      const encoding8 = this.#encodings[this.#iteratorCount++];
      return Promise.resolve({
        value: new EncodingProcess(encoding8),
        done: false,
      });
    }
    return Promise.resolve({
      done: true,
      value: null,
    });
  }
  #addEncoding = () => {
    this.#encodings.push(this.#global.clone());
    this.#encodingIndex = this.#encodings.length - 1;
  };
}
const mod = function () {
  return {
    ffmpeg: ffmpeg1,
    FFmpeg: FFmpeg,
  };
}();
const noColor1 = globalThis.Deno?.noColor ?? true;
let enabled1 = !noColor1;
function setColorEnabled(value) {
  if (noColor1) {
    return;
  }
  enabled1 = value;
}
function getColorEnabled() {
  return enabled1;
}
function code1(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run2(str, code2) {
  return enabled1
    ? `${code2.open}${str.replace(code2.regexp, code2.open)}${code2.close}`
    : str;
}
function reset(str) {
  return run2(
    str,
    code1([
      0,
    ], 0),
  );
}
function bold1(str) {
  return run2(
    str,
    code1([
      1,
    ], 22),
  );
}
function dim(str) {
  return run2(
    str,
    code1([
      2,
    ], 22),
  );
}
function italic(str) {
  return run2(
    str,
    code1([
      3,
    ], 23),
  );
}
function underline(str) {
  return run2(
    str,
    code1([
      4,
    ], 24),
  );
}
function inverse(str) {
  return run2(
    str,
    code1([
      7,
    ], 27),
  );
}
function hidden1(str) {
  return run2(
    str,
    code1([
      8,
    ], 28),
  );
}
function strikethrough(str) {
  return run2(
    str,
    code1([
      9,
    ], 29),
  );
}
function black(str) {
  return run2(
    str,
    code1([
      30,
    ], 39),
  );
}
function red1(str) {
  return run2(
    str,
    code1([
      31,
    ], 39),
  );
}
function green(str) {
  return run2(
    str,
    code1([
      32,
    ], 39),
  );
}
function yellow(str) {
  return run2(
    str,
    code1([
      33,
    ], 39),
  );
}
function blue(str) {
  return run2(
    str,
    code1([
      34,
    ], 39),
  );
}
function magenta(str) {
  return run2(
    str,
    code1([
      35,
    ], 39),
  );
}
function cyan(str) {
  return run2(
    str,
    code1([
      36,
    ], 39),
  );
}
function white(str) {
  return run2(
    str,
    code1([
      37,
    ], 39),
  );
}
function gray(str) {
  return brightBlack(str);
}
function brightBlack(str) {
  return run2(
    str,
    code1([
      90,
    ], 39),
  );
}
function brightRed(str) {
  return run2(
    str,
    code1([
      91,
    ], 39),
  );
}
function brightGreen(str) {
  return run2(
    str,
    code1([
      92,
    ], 39),
  );
}
function brightYellow(str) {
  return run2(
    str,
    code1([
      93,
    ], 39),
  );
}
function brightBlue(str) {
  return run2(
    str,
    code1([
      94,
    ], 39),
  );
}
function brightMagenta(str) {
  return run2(
    str,
    code1([
      95,
    ], 39),
  );
}
function brightCyan(str) {
  return run2(
    str,
    code1([
      96,
    ], 39),
  );
}
function brightWhite(str) {
  return run2(
    str,
    code1([
      97,
    ], 39),
  );
}
function bgBlack(str) {
  return run2(
    str,
    code1([
      40,
    ], 49),
  );
}
function bgRed(str) {
  return run2(
    str,
    code1([
      41,
    ], 49),
  );
}
function bgGreen(str) {
  return run2(
    str,
    code1([
      42,
    ], 49),
  );
}
function bgYellow(str) {
  return run2(
    str,
    code1([
      43,
    ], 49),
  );
}
function bgBlue(str) {
  return run2(
    str,
    code1([
      44,
    ], 49),
  );
}
function bgMagenta(str) {
  return run2(
    str,
    code1([
      45,
    ], 49),
  );
}
function bgCyan(str) {
  return run2(
    str,
    code1([
      46,
    ], 49),
  );
}
function bgWhite(str) {
  return run2(
    str,
    code1([
      47,
    ], 49),
  );
}
function bgBrightBlack(str) {
  return run2(
    str,
    code1([
      100,
    ], 49),
  );
}
function bgBrightRed(str) {
  return run2(
    str,
    code1([
      101,
    ], 49),
  );
}
function bgBrightGreen(str) {
  return run2(
    str,
    code1([
      102,
    ], 49),
  );
}
function bgBrightYellow(str) {
  return run2(
    str,
    code1([
      103,
    ], 49),
  );
}
function bgBrightBlue(str) {
  return run2(
    str,
    code1([
      104,
    ], 49),
  );
}
function bgBrightMagenta(str) {
  return run2(
    str,
    code1([
      105,
    ], 49),
  );
}
function bgBrightCyan(str) {
  return run2(
    str,
    code1([
      106,
    ], 49),
  );
}
function bgBrightWhite(str) {
  return run2(
    str,
    code1([
      107,
    ], 49),
  );
}
function clampAndTruncate(n, max = 255, min = 0) {
  return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
  return run2(
    str,
    code1([
      38,
      5,
      clampAndTruncate(color),
    ], 39),
  );
}
function bgRgb8(str, color) {
  return run2(
    str,
    code1([
      48,
      5,
      clampAndTruncate(color),
    ], 49),
  );
}
function rgb24(str, color) {
  if (typeof color === "number") {
    return run2(
      str,
      code1([
        38,
        2,
        color >> 16 & 255,
        color >> 8 & 255,
        color & 255,
      ], 39),
    );
  }
  return run2(
    str,
    code1([
      38,
      2,
      clampAndTruncate(color.r),
      clampAndTruncate(color.g),
      clampAndTruncate(color.b),
    ], 39),
  );
}
function bgRgb24(str, color) {
  if (typeof color === "number") {
    return run2(
      str,
      code1([
        48,
        2,
        color >> 16 & 255,
        color >> 8 & 255,
        color & 255,
      ], 49),
    );
  }
  return run2(
    str,
    code1([
      48,
      2,
      clampAndTruncate(color.r),
      clampAndTruncate(color.g),
      clampAndTruncate(color.b),
    ], 49),
  );
}
const ANSI_PATTERN1 = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|"),
  "g",
);
function stripColor(string) {
  return string.replace(ANSI_PATTERN1, "");
}
const mod1 = function () {
  return {
    setColorEnabled: setColorEnabled,
    getColorEnabled: getColorEnabled,
    reset: reset,
    bold: bold1,
    dim: dim,
    italic: italic,
    underline: underline,
    inverse: inverse,
    hidden: hidden1,
    strikethrough: strikethrough,
    black: black,
    red: red1,
    green: green,
    yellow: yellow,
    blue: blue,
    magenta: magenta,
    cyan: cyan,
    white: white,
    gray: gray,
    brightBlack: brightBlack,
    brightRed: brightRed,
    brightGreen: brightGreen,
    brightYellow: brightYellow,
    brightBlue: brightBlue,
    brightMagenta: brightMagenta,
    brightCyan: brightCyan,
    brightWhite: brightWhite,
    bgBlack: bgBlack,
    bgRed: bgRed,
    bgGreen: bgGreen,
    bgYellow: bgYellow,
    bgBlue: bgBlue,
    bgMagenta: bgMagenta,
    bgCyan: bgCyan,
    bgWhite: bgWhite,
    bgBrightBlack: bgBrightBlack,
    bgBrightRed: bgBrightRed,
    bgBrightGreen: bgBrightGreen,
    bgBrightYellow: bgBrightYellow,
    bgBrightBlue: bgBrightBlue,
    bgBrightMagenta: bgBrightMagenta,
    bgBrightCyan: bgBrightCyan,
    bgBrightWhite: bgBrightWhite,
    rgb8: rgb8,
    bgRgb8: bgRgb8,
    rgb24: rgb24,
    bgRgb24: bgRgb24,
    stripColor: stripColor,
  };
}();
function distance(a, b) {
  if (a.length == 0) {
    return b.length;
  }
  if (b.length == 0) {
    return a.length;
  }
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [
      i,
    ];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i1 = 1; i1 <= b.length; i1++) {
    for (let j1 = 1; j1 <= a.length; j1++) {
      if (b.charAt(i1 - 1) == a.charAt(j1 - 1)) {
        matrix[i1][j1] = matrix[i1 - 1][j1 - 1];
      } else {
        matrix[i1][j1] = Math.min(
          matrix[i1 - 1][j1 - 1] + 1,
          Math.min(matrix[i1][j1 - 1] + 1, matrix[i1 - 1][j1] + 1),
        );
      }
    }
  }
  return matrix[b.length][a.length];
}
function paramCaseToCamelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
function getOption(flags, name1) {
  while (name1[0] === "-") {
    name1 = name1.slice(1);
  }
  for (const flag of flags) {
    if (isOption(flag, name1)) {
      return flag;
    }
  }
  return;
}
function didYouMeanOption(option, options17) {
  const optionNames = options17.map((option1) => [
    option1.name,
    ...option1.aliases ?? [],
  ]).flat().map((option1) => getFlag(option1));
  return didYouMean(" Did you mean option", getFlag(option), optionNames);
}
function didYouMeanType(type, types) {
  return didYouMean(" Did you mean type", type, types);
}
function didYouMean(message2, type, types) {
  const match = closest(type, types);
  return match ? `${message2} "${match}"?` : "";
}
function getFlag(name1) {
  if (name1.startsWith("-")) {
    return name1;
  }
  if (name1.length > 1) {
    return `--${name1}`;
  }
  return `-${name1}`;
}
function isOption(option, name1) {
  return option.name === name1 ||
    option.aliases && option.aliases.indexOf(name1) !== -1;
}
function closest(str, arr) {
  let minDistance = Infinity;
  let minIndex = 0;
  for (let i = 0; i < arr.length; i++) {
    const dist = distance(str, arr[i]);
    if (dist < minDistance) {
      minDistance = dist;
      minIndex = i;
    }
  }
  return arr[minIndex];
}
var OptionType;
(function (OptionType1) {
  OptionType1["STRING"] = "string";
  OptionType1["NUMBER"] = "number";
  OptionType1["BOOLEAN"] = "boolean";
})(OptionType || (OptionType = {}));
const __boolean = ({ label, name: name1, value, type }) => {
  if (
    ~[
      "1",
      "true",
    ].indexOf(value)
  ) {
    return true;
  }
  if (
    ~[
      "0",
      "false",
    ].indexOf(value)
  ) {
    return false;
  }
  throw new Error(
    `${label} "${name1}" must be of type "${type}", but got "${value}".`,
  );
};
const number = ({ label, name: name1, value, type }) => {
  if (isNaN(Number(value))) {
    throw new Error(
      `${label} "${name1}" must be of type "${type}", but got "${value}".`,
    );
  }
  return parseFloat(value);
};
const string = ({ value }) => {
  return value;
};
function getPermissions() {
  return hasPermissions([
    "env",
    "hrtime",
    "net",
    "plugin",
    "read",
    "run",
    "write",
  ]);
}
function isUnstable() {
  return !!Deno.permissions;
}
function didYouMeanCommand(command, commands, excludes = []) {
  const commandNames = commands.map((command1) => command1.getName()).filter((
    command1,
  ) => !excludes.includes(command1));
  return didYouMean(" Did you mean command", command, commandNames);
}
async function hasPermission(permission) {
  try {
    return (await Deno.permissions?.query?.({
      name: permission,
    }))?.state === "granted";
  } catch {
    return false;
  }
}
async function hasPermissions(names) {
  const permissions = {};
  await Promise.all(
    names.map((name1) =>
      hasPermission(name1).then((hasPermission1) =>
        permissions[name1] = hasPermission1
      )
    ),
  );
  return permissions;
}
const ARGUMENT_REGEX = /^[<\[].+[\]>]$/;
const ARGUMENT_DETAILS_REGEX = /[<\[:>\]]/;
function splitArguments(args) {
  const parts = args.trim().split(/[, =] */g);
  const typeParts = [];
  while (
    parts[parts.length - 1] && ARGUMENT_REGEX.test(parts[parts.length - 1])
  ) {
    typeParts.unshift(parts.pop());
  }
  const typeDefinition = typeParts.join(" ");
  return {
    flags: parts,
    typeDefinition,
  };
}
function parseArgumentsDefinition(argsDefinition) {
  const argumentDetails = [];
  let hasOptional = false;
  let hasVariadic = false;
  const parts = argsDefinition.split(/ +/);
  for (const arg of parts) {
    if (hasVariadic) {
      throw new ArgumentFollowsVariadicArgument(arg);
    }
    const parts1 = arg.split(ARGUMENT_DETAILS_REGEX);
    const type = parts1[2] || OptionType.STRING;
    const details = {
      optionalValue: arg[0] !== "<",
      name: parts1[1],
      action: parts1[3] || type,
      variadic: false,
      list: type ? arg.indexOf(type + "[]") !== -1 : false,
      type,
    };
    if (!details.optionalValue && hasOptional) {
      throw new RequiredArgumentFollowsOptionalArgument(details.name);
    }
    if (arg[0] === "[") {
      hasOptional = true;
    }
    if (details.name.length > 3) {
      const istVariadicLeft = details.name.slice(0, 3) === "...";
      const istVariadicRight = details.name.slice(-3) === "...";
      hasVariadic = details.variadic = istVariadicLeft || istVariadicRight;
      if (istVariadicLeft) {
        details.name = details.name.slice(3);
      } else if (istVariadicRight) {
        details.name = details.name.slice(0, -3);
      }
    }
    if (details.name) {
      argumentDetails.push(details);
    }
  }
  return argumentDetails;
}
const noColor2 = globalThis.Deno?.noColor ?? true;
let enabled2 = !noColor2;
function code2(open, close) {
  return {
    open: `\x1b[${open.join(";")}m`,
    close: `\x1b[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
  };
}
function run3(str, code3) {
  return enabled2
    ? `${code3.open}${str.replace(code3.regexp, code3.open)}${code3.close}`
    : str;
}
function bold2(str) {
  return run3(
    str,
    code2([
      1,
    ], 22),
  );
}
function dim1(str) {
  return run3(
    str,
    code2([
      2,
    ], 22),
  );
}
function italic1(str) {
  return run3(
    str,
    code2([
      3,
    ], 23),
  );
}
function red2(str) {
  return run3(
    str,
    code2([
      31,
    ], 39),
  );
}
function green1(str) {
  return run3(
    str,
    code2([
      32,
    ], 39),
  );
}
function yellow1(str) {
  return run3(
    str,
    code2([
      33,
    ], 39),
  );
}
function blue1(str) {
  return run3(
    str,
    code2([
      34,
    ], 39),
  );
}
function magenta1(str) {
  return run3(
    str,
    code2([
      35,
    ], 39),
  );
}
const ANSI_PATTERN2 = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|"),
  "g",
);
function stripColor1(string1) {
  return string1.replace(ANSI_PATTERN2, "");
}
function existsSync(filePath) {
  try {
    Deno.lstatSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}
class Cell {
  options = {};
  get length() {
    return this.toString().length;
  }
  static from(value) {
    const cell = new this(value);
    if (value instanceof Cell) {
      cell.options = {
        ...value.options,
      };
    }
    return cell;
  }
  constructor(value1) {
    this.value = value1;
  }
  toString() {
    return this.value.toString();
  }
  setValue(value) {
    this.value = value;
    return this;
  }
  clone(value) {
    const cell = new Cell(value ?? this);
    cell.options = {
      ...this.options,
    };
    return cell;
  }
  border(enable, override = true) {
    if (override || typeof this.options.border === "undefined") {
      this.options.border = enable;
    }
    return this;
  }
  colSpan(span, override = true) {
    if (override || typeof this.options.colSpan === "undefined") {
      this.options.colSpan = span;
    }
    return this;
  }
  rowSpan(span, override = true) {
    if (override || typeof this.options.rowSpan === "undefined") {
      this.options.rowSpan = span;
    }
    return this;
  }
  getBorder() {
    return this.options.border === true;
  }
  getColSpan() {
    return typeof this.options.colSpan === "number" && this.options.colSpan > 0
      ? this.options.colSpan
      : 1;
  }
  getRowSpan() {
    return typeof this.options.rowSpan === "number" && this.options.rowSpan > 0
      ? this.options.rowSpan
      : 1;
  }
}
class FlagsError extends Error {
  constructor(message2) {
    super(message2);
    Object.setPrototypeOf(this, FlagsError.prototype);
  }
}
class UnknownRequiredOption extends FlagsError {
  constructor(option9, options17) {
    super(
      `Unknown required option "${getFlag(option9)}".${
        didYouMeanOption(option9, options17)
      }`,
    );
    Object.setPrototypeOf(this, UnknownRequiredOption.prototype);
  }
}
class UnknownConflictingOption extends FlagsError {
  constructor(option1, options18) {
    super(
      `Unknown conflicting option "${getFlag(option1)}".${
        didYouMeanOption(option1, options18)
      }`,
    );
    Object.setPrototypeOf(this, UnknownConflictingOption.prototype);
  }
}
class DuplicateOptionName extends FlagsError {
  constructor(name1) {
    super(`Option with name "${getFlag(name1)}" already exists.`);
    Object.setPrototypeOf(this, DuplicateOptionName.prototype);
  }
}
class UnknownType extends FlagsError {
  constructor(type1, types1) {
    super(`Unknown type "${type1}".${didYouMeanType(type1, types1)}`);
    Object.setPrototypeOf(this, UnknownType.prototype);
  }
}
class ValidationError extends FlagsError {
  constructor(message3) {
    super(message3);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
class UnknownOption extends ValidationError {
  constructor(option2, options19) {
    super(
      `Unknown option "${getFlag(option2)}".${
        didYouMeanOption(option2, options19)
      }`,
    );
    Object.setPrototypeOf(this, UnknownOption.prototype);
  }
}
class MissingOptionValue extends ValidationError {
  constructor(option3) {
    super(`Missing value for option "${getFlag(option3)}".`);
    Object.setPrototypeOf(this, MissingOptionValue.prototype);
  }
}
class InvalidOptionValue extends ValidationError {
  constructor(option4, expected, value2) {
    super(
      `Option "${
        getFlag(option4)
      }" must be of type "${expected}", but got "${value2}".`,
    );
    Object.setPrototypeOf(this, InvalidOptionValue.prototype);
  }
}
class OptionNotCombinable extends ValidationError {
  constructor(option5) {
    super(
      `Option "${getFlag(option5)}" cannot be combined with other options.`,
    );
    Object.setPrototypeOf(this, OptionNotCombinable.prototype);
  }
}
class ConflictingOption extends ValidationError {
  constructor(option6, conflictingOption) {
    super(
      `Option "${getFlag(option6)}" conflicts with option "${
        getFlag(conflictingOption)
      }".`,
    );
    Object.setPrototypeOf(this, ConflictingOption.prototype);
  }
}
class DependingOption extends ValidationError {
  constructor(option7, dependingOption) {
    super(
      `Option "${getFlag(option7)}" depends on option "${
        getFlag(dependingOption)
      }".`,
    );
    Object.setPrototypeOf(this, DependingOption.prototype);
  }
}
class MissingRequiredOption extends ValidationError {
  constructor(option8) {
    super(`Missing required option "${getFlag(option8)}".`);
    Object.setPrototypeOf(this, MissingRequiredOption.prototype);
  }
}
class RequiredArgumentFollowsOptionalArgument extends ValidationError {
  constructor(arg3) {
    super(
      `An required argument cannot follow an optional argument, but "${arg3}"  is defined as required.`,
    );
    Object.setPrototypeOf(
      this,
      RequiredArgumentFollowsOptionalArgument.prototype,
    );
  }
}
class ArgumentFollowsVariadicArgument extends ValidationError {
  constructor(arg1) {
    super(`An argument cannot follow an variadic argument, but got "${arg1}".`);
    Object.setPrototypeOf(this, ArgumentFollowsVariadicArgument.prototype);
  }
}
class NoArguments extends ValidationError {
  constructor() {
    super(`No arguments.`);
    Object.setPrototypeOf(this, NoArguments.prototype);
  }
}
function normalize(args) {
  const normalized = [];
  let inLiteral = false;
  for (const arg2 of args) {
    if (inLiteral) {
      normalized.push(arg2);
    } else if (arg2 === "--") {
      inLiteral = true;
      normalized.push(arg2);
    } else if (arg2.length > 1 && arg2[0] === "-") {
      const isLong = arg2[1] === "-";
      const isDotted = !isLong && arg2[2] === ".";
      if (arg2.includes("=")) {
        const parts = arg2.split("=");
        const flag = parts.shift();
        if (isLong) {
          normalized.push(flag);
        } else {
          normalizeShortFlags(flag);
        }
        normalized.push(parts.join("="));
      } else if (isLong || isDotted) {
        normalized.push(arg2);
      } else {
        normalizeShortFlags(arg2);
      }
    } else {
      normalized.push(arg2);
    }
  }
  return normalized;
  function normalizeShortFlags(flag) {
    const flags = flag.slice(1).split("");
    if (isNaN(Number(flag[flag.length - 1]))) {
      flags.forEach((val) => normalized.push(`-${val}`));
    } else {
      normalized.push(`-${flags.shift()}`);
      normalized.push(flags.join(""));
    }
  }
}
function validateFlags(
  flags,
  values,
  knownFlaks,
  allowEmpty,
  optionNames = {},
) {
  const defaultValues = {};
  for (const option9 of flags) {
    let name2;
    let defaultValue = undefined;
    if (option9.name.startsWith("no-")) {
      const propName = option9.name.replace(/^no-/, "");
      if (propName in values) {
        continue;
      }
      const positiveOption = getOption(flags, propName);
      if (positiveOption) {
        continue;
      }
      name2 = paramCaseToCamelCase(propName);
      defaultValue = true;
    }
    if (!name2) {
      name2 = paramCaseToCamelCase(option9.name);
    }
    if (!(name2 in optionNames)) {
      optionNames[name2] = option9.name;
    }
    if (
      typeof values[name2] === "undefined" &&
      (typeof option9.default !== "undefined" ||
        typeof defaultValue !== "undefined")
    ) {
      values[name2] = typeof option9.default === "function"
        ? option9.default()
        : option9.default ?? defaultValue;
      defaultValues[option9.name] = true;
    }
  }
  const keys = Object.keys(values);
  if (keys.length === 0 && allowEmpty) {
    return;
  }
  const options20 = keys.map((name2) => ({
    name: name2,
    option: getOption(flags, optionNames[name2]),
  }));
  for (const { name: name2, option: option10 } of options20) {
    if (!option10) {
      throw new UnknownOption(name2, flags);
    }
    if (option10.standalone) {
      if (keys.length > 1) {
        if (
          options20.every(({ option: opt }) =>
            opt && (option10 === opt || defaultValues[opt.name])
          )
        ) {
          return;
        }
        throw new OptionNotCombinable(option10.name);
      }
      return;
    }
    option10.conflicts?.forEach((flag) => {
      if (isset(flag, values)) {
        throw new ConflictingOption(option10.name, flag);
      }
    });
    option10.depends?.forEach((flag) => {
      if (!isset(flag, values) && !defaultValues[option10.name]) {
        throw new DependingOption(option10.name, flag);
      }
    });
    const isArray = (option10.args?.length || 0) > 1;
    option10.args?.forEach((arg2, i) => {
      if (
        arg2.requiredValue &&
        (typeof values[name2] === "undefined" ||
          isArray && typeof values[name2][i] === "undefined")
      ) {
        throw new MissingOptionValue(option10.name);
      }
    });
  }
  for (const option11 of flags) {
    if (option11.required && !(paramCaseToCamelCase(option11.name) in values)) {
      if (
        (!option11.conflicts || !option11.conflicts.find((flag) =>
          !!values[flag]
        )) && !options20.find((opt) =>
          opt.option?.conflicts?.find((flag) => flag === option11.name)
        )
      ) {
        throw new MissingRequiredOption(option11.name);
      }
    }
  }
  if (keys.length === 0 && !allowEmpty) {
    throw new NoArguments();
  }
}
function isset(flag, values) {
  const name2 = paramCaseToCamelCase(flag);
  return typeof values[name2] !== "undefined";
}
const Types = {
  [OptionType.STRING]: string,
  [OptionType.NUMBER]: number,
  [OptionType.BOOLEAN]: __boolean,
};
function parseFlags(args, opts1 = {}) {
  !opts1.flags && (opts1.flags = []);
  const normalized = normalize(args);
  let inLiteral = false;
  let negate = false;
  const flags = {};
  const optionNames = {};
  const literal = [];
  const unknown = [];
  let stopEarly = false;
  opts1.flags.forEach((opt) => {
    opt.depends?.forEach((flag) => {
      if (!opts1.flags || !getOption(opts1.flags, flag)) {
        throw new UnknownRequiredOption(flag, opts1.flags ?? []);
      }
    });
    opt.conflicts?.forEach((flag) => {
      if (!opts1.flags || !getOption(opts1.flags, flag)) {
        throw new UnknownConflictingOption(flag, opts1.flags ?? []);
      }
    });
  });
  for (let i = 0; i < normalized.length; i++) {
    let option9;
    let args1;
    const current = normalized[i];
    if (inLiteral) {
      literal.push(current);
      continue;
    }
    if (current === "--") {
      inLiteral = true;
      continue;
    }
    const isFlag = current.length > 1 && current[0] === "-";
    const next = () => normalized[i + 1];
    if (isFlag && !stopEarly) {
      if (current[2] === "-" || current[1] === "-" && current.length === 3) {
        throw new UnknownOption(current, opts1.flags);
      }
      negate = current.startsWith("--no-");
      option9 = getOption(opts1.flags, current);
      if (!option9) {
        if (opts1.flags.length) {
          throw new UnknownOption(current, opts1.flags);
        }
        option9 = {
          name: current.replace(/^-+/, ""),
          optionalValue: true,
          type: OptionType.STRING,
        };
      }
      const positiveName = option9.name.replace(/^no-?/, "");
      const propName = paramCaseToCamelCase(positiveName);
      if (typeof flags[propName] !== "undefined" && !option9.collect) {
        throw new DuplicateOptionName(current);
      }
      args1 = option9.args?.length ? option9.args : [
        {
          type: option9.type,
          requiredValue: option9.requiredValue,
          optionalValue: option9.optionalValue,
          variadic: option9.variadic,
          list: option9.list,
          separator: option9.separator,
        },
      ];
      let argIndex = 0;
      let inOptionalArg = false;
      const previous = flags[propName];
      parseNext(option9, args1);
      if (typeof flags[propName] === "undefined") {
        if (typeof option9.default !== "undefined") {
          flags[propName] = typeof option9.default === "function"
            ? option9.default()
            : option9.default;
        } else if (args1[argIndex].requiredValue) {
          throw new MissingOptionValue(option9.name);
        } else {
          flags[propName] = true;
        }
      }
      if (typeof option9.value !== "undefined") {
        flags[propName] = option9.value(flags[propName], previous);
      } else if (option9.collect) {
        const value3 = Array.isArray(previous) ? previous : [];
        value3.push(flags[propName]);
        flags[propName] = value3;
      }
      optionNames[propName] = option9.name;
      opts1.option?.(option9, flags[propName]);
      function parseNext(option10, args2) {
        const arg2 = args2[argIndex];
        if (!arg2) {
          const flag = next();
          throw new UnknownOption(flag, opts1.flags ?? []);
        }
        if (!arg2.type) {
          arg2.type = OptionType.BOOLEAN;
        }
        if (option10.args?.length) {
          if (
            (typeof arg2.optionalValue === "undefined" ||
              arg2.optionalValue === false) &&
            typeof arg2.requiredValue === "undefined"
          ) {
            arg2.requiredValue = true;
          }
        } else {
          if (
            arg2.type !== OptionType.BOOLEAN &&
            (typeof arg2.optionalValue === "undefined" ||
              arg2.optionalValue === false) &&
            typeof arg2.requiredValue === "undefined"
          ) {
            arg2.requiredValue = true;
          }
        }
        if (arg2.requiredValue) {
          if (inOptionalArg) {
            throw new RequiredArgumentFollowsOptionalArgument(option10.name);
          }
        } else {
          inOptionalArg = true;
        }
        if (negate) {
          flags[propName] = false;
          return;
        }
        let result;
        let increase = false;
        if (arg2.list && hasNext(arg2)) {
          const parsed = next().split(arg2.separator || ",").map(
            (nextValue) => {
              const value3 = parseValue(option10, arg2, nextValue);
              if (typeof value3 === "undefined") {
                throw new InvalidOptionValue(
                  option10.name,
                  arg2.type ?? "?",
                  nextValue,
                );
              }
              return value3;
            },
          );
          if (parsed?.length) {
            result = parsed;
          }
        } else {
          if (hasNext(arg2)) {
            result = parseValue(option10, arg2, next());
          } else if (arg2.optionalValue && arg2.type === OptionType.BOOLEAN) {
            result = true;
          }
        }
        if (increase) {
          i++;
          if (!arg2.variadic) {
            argIndex++;
          } else if (args2[argIndex + 1]) {
            throw new ArgumentFollowsVariadicArgument(next());
          }
        }
        if (
          typeof result !== "undefined" && (args2.length > 1 || arg2.variadic)
        ) {
          if (!flags[propName]) {
            flags[propName] = [];
          }
          flags[propName].push(result);
          if (hasNext(arg2)) {
            parseNext(option10, args2);
          }
        } else {
          flags[propName] = result;
        }
        function hasNext(arg3) {
          return !!(normalized[i + 1] &&
            (arg3.optionalValue || arg3.requiredValue || arg3.variadic) &&
            (normalized[i + 1][0] !== "-" ||
              arg3.type === OptionType.NUMBER &&
                !isNaN(Number(normalized[i + 1]))) &&
            arg3);
        }
        function parseValue(option11, arg3, value3) {
          const type1 = arg3.type || OptionType.STRING;
          const result1 = opts1.parse
            ? opts1.parse({
              label: "Option",
              type: type1,
              name: `--${option11.name}`,
              value: value3,
            })
            : parseFlagValue(option11, arg3, value3);
          if (typeof result1 !== "undefined") {
            increase = true;
          }
          return result1;
        }
      }
    } else {
      if (opts1.stopEarly) {
        stopEarly = true;
      }
      unknown.push(current);
    }
  }
  if (opts1.flags && opts1.flags.length) {
    validateFlags(
      opts1.flags,
      flags,
      opts1.knownFlaks,
      opts1.allowEmpty,
      optionNames,
    );
  }
  const result = Object.keys(flags).reduce((result1, key) => {
    if (~key.indexOf(".")) {
      key.split(".").reduce((result2, subKey, index, parts) => {
        if (index === parts.length - 1) {
          result2[subKey] = flags[key];
        } else {
          result2[subKey] = result2[subKey] ?? {};
        }
        return result2[subKey];
      }, result1);
    } else {
      result1[key] = flags[key];
    }
    return result1;
  }, {});
  return {
    flags: result,
    unknown,
    literal,
  };
}
function parseFlagValue(option9, arg2, value3) {
  const type1 = arg2.type || OptionType.STRING;
  const parseType = Types[type1];
  if (!parseType) {
    throw new UnknownType(type1, Object.keys(Types));
  }
  return parseType({
    label: "Option",
    type: type1,
    name: `--${option9.name}`,
    value: value3,
  });
}
class CommandError extends Error {
  constructor(message4) {
    super(message4);
    Object.setPrototypeOf(this, CommandError.prototype);
  }
}
class MissingCommandName extends CommandError {
  constructor() {
    super("Missing command name.");
    Object.setPrototypeOf(this, MissingCommandName.prototype);
  }
}
class DuplicateCommandName extends CommandError {
  constructor(name2) {
    super(`Duplicate command name "${name2}".`);
    Object.setPrototypeOf(this, DuplicateCommandName.prototype);
  }
}
class DuplicateCommandAlias extends CommandError {
  constructor(alias1) {
    super(`Duplicate command alias "${alias1}".`);
    Object.setPrototypeOf(this, DuplicateCommandAlias.prototype);
  }
}
class CommandNotFound extends CommandError {
  constructor(name3, commands4, excluded) {
    super(
      `Unknown command "${name3}".${
        didYouMeanCommand(name3, commands4, excluded)
      }`,
    );
    Object.setPrototypeOf(this, UnknownCommand.prototype);
  }
}
class DuplicateType extends CommandError {
  constructor(name4) {
    super(`Type with name "${name4}" already exists.`);
    Object.setPrototypeOf(this, DuplicateType.prototype);
  }
}
class DuplicateCompletion extends CommandError {
  constructor(name5) {
    super(`Completion with name "${name5}" already exists.`);
    Object.setPrototypeOf(this, DuplicateCompletion.prototype);
  }
}
class DuplicateExample extends CommandError {
  constructor(name6) {
    super(`Example with name "${name6}" already exists.`);
    Object.setPrototypeOf(this, DuplicateExample.prototype);
  }
}
class DuplicateEnvironmentVariable extends CommandError {
  constructor(name7) {
    super(`Environment variable with name "${name7}" already exists.`);
    Object.setPrototypeOf(this, DuplicateEnvironmentVariable.prototype);
  }
}
class EnvironmentVariableSingleValue extends CommandError {
  constructor(name8) {
    super(
      `An environment variable can only have one value, but "${name8}" has more than one.`,
    );
    Object.setPrototypeOf(this, EnvironmentVariableSingleValue.prototype);
  }
}
class EnvironmentVariableOptionalValue extends CommandError {
  constructor(name9) {
    super(
      `An environment variable cannot have an optional value, but "${name9}" is defined as optional.`,
    );
    Object.setPrototypeOf(this, EnvironmentVariableOptionalValue.prototype);
  }
}
class EnvironmentVariableVariadicValue extends CommandError {
  constructor(name10) {
    super(
      `An environment variable cannot have an variadic value, but "${name10}" is defined as variadic.`,
    );
    Object.setPrototypeOf(this, EnvironmentVariableVariadicValue.prototype);
  }
}
class DefaultCommandNotFound extends CommandError {
  constructor(name11, commands1) {
    super(
      `Default command "${name11}" not found.${
        didYouMeanCommand(name11, commands1)
      }`,
    );
    Object.setPrototypeOf(this, DefaultCommandNotFound.prototype);
  }
}
class CommandExecutableNotFound extends CommandError {
  constructor(name12, files) {
    super(
      `Command executable not found: ${name12}:\n    - ${
        files.join("\\n    - ")
      }`,
    );
    Object.setPrototypeOf(this, CommandExecutableNotFound.prototype);
  }
}
class UnknownCompletionCommand extends CommandError {
  constructor(name13, commands2) {
    super(
      `Auto-completion failed. Unknown command "${name13}".${
        didYouMeanCommand(name13, commands2)
      }`,
    );
    Object.setPrototypeOf(this, UnknownCompletionCommand.prototype);
  }
}
class UnknownCommand extends ValidationError {
  constructor(name14, commands3, excluded1) {
    super(
      `Unknown command "${name14}".${
        didYouMeanCommand(name14, commands3, excluded1)
      }`,
    );
    Object.setPrototypeOf(this, UnknownCommand.prototype);
  }
}
class NoArgumentsAllowed extends ValidationError {
  constructor(name15) {
    super(`No arguments allowed for command "${name15}".`);
    Object.setPrototypeOf(this, NoArgumentsAllowed.prototype);
  }
}
class MissingArguments extends ValidationError {
  constructor(args2) {
    super("Missing argument(s): " + args2.join(", "));
    Object.setPrototypeOf(this, MissingArguments.prototype);
  }
}
class MissingArgument extends ValidationError {
  constructor(arg2) {
    super(`Missing argument "${arg2}".`);
    Object.setPrototypeOf(this, MissingArgument.prototype);
  }
}
class TooManyArguments extends ValidationError {
  constructor(args1) {
    super(`Too many arguments: ${args1.join(" ")}`);
    Object.setPrototypeOf(this, TooManyArguments.prototype);
  }
}
class Type {
}
class BooleanType extends Type {
  parse(type) {
    return __boolean(type);
  }
  complete() {
    return [
      "true",
      "false",
    ];
  }
}
class NumberType extends Type {
  parse(type) {
    return number(type);
  }
}
class StringType extends Type {
  parse(type) {
    return string(type);
  }
}
const border = {
  top: "─",
  topMid: "┬",
  topLeft: "┌",
  topRight: "┐",
  bottom: "─",
  bottomMid: "┴",
  bottomLeft: "└",
  bottomRight: "┘",
  left: "│",
  leftMid: "├",
  mid: "─",
  midMid: "┼",
  right: "│",
  rightMid: "┤",
  middle: "│",
};
class Row extends Array {
  options = {};
  static from(cells) {
    const row = new this(...cells);
    if (cells instanceof Row) {
      row.options = {
        ...cells.options,
      };
    }
    return row;
  }
  clone() {
    const row = new Row(
      ...this.map((cell) => cell instanceof Cell ? cell.clone() : cell),
    );
    row.options = {
      ...this.options,
    };
    return row;
  }
  border(enable, override = true) {
    if (override || typeof this.options.border === "undefined") {
      this.options.border = enable;
    }
    return this;
  }
  getBorder() {
    return this.options.border === true;
  }
  hasBorder() {
    return this.getBorder() ||
      this.some((cell) => cell instanceof Cell && cell.getBorder());
  }
}
function consumeWords(length, content) {
  let consumed = "";
  const words = content.split(/ /g);
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    const hasLineBreak = word.indexOf("\n") !== -1;
    if (hasLineBreak) {
      word = word.split("\n").shift();
    }
    if (consumed) {
      const nextLength = stripColor1(word).length;
      const consumedLength = stripColor1(consumed).length;
      if (consumedLength + nextLength >= length) {
        break;
      }
    }
    consumed += (i > 0 ? " " : "") + word;
    if (hasLineBreak) {
      break;
    }
  }
  return consumed;
}
function longest(index, rows, maxWidth) {
  return Math.max(
    ...rows.map((row) =>
      (row[index] instanceof Cell && row[index].getColSpan() > 1
        ? ""
        : row[index]?.toString() || "").split("\n").map((r) => {
          const str = typeof maxWidth === "undefined"
            ? r
            : consumeWords(maxWidth, r);
          return stripColor1(str).length || 0;
        })
    ).flat(),
  );
}
class TableLayout {
  constructor(table, options20) {
    this.table = table;
    this.options = options20;
  }
  toString() {
    const opts1 = this.createLayout();
    return opts1.rows.length ? this.renderRows(opts1) : "";
  }
  createLayout() {
    Object.keys(this.options.chars).forEach((key) => {
      if (typeof this.options.chars[key] !== "string") {
        this.options.chars[key] = "";
      }
    });
    const hasBodyBorder = this.table.getBorder() || this.table.hasBodyBorder();
    const hasHeaderBorder = this.table.hasHeaderBorder();
    const hasBorder = hasHeaderBorder || hasBodyBorder;
    const header = this.table.getHeader();
    const rows = this.spanRows(
      header
        ? [
          header,
          ...this.table,
        ]
        : this.table.slice(),
    );
    const columns = Math.max(...rows.map((row) => row.length));
    for (const row of rows) {
      const length = row.length;
      if (length < columns) {
        const diff = columns - length;
        for (let i = 0; i < diff; i++) {
          row.push(this.createCell(null, row));
        }
      }
    }
    const padding = [];
    const width = [];
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const minColWidth = Array.isArray(this.options.minColWidth)
        ? this.options.minColWidth[colIndex]
        : this.options.minColWidth;
      const maxColWidth = Array.isArray(this.options.maxColWidth)
        ? this.options.maxColWidth[colIndex]
        : this.options.maxColWidth;
      const colWidth = longest(colIndex, rows, maxColWidth);
      width[colIndex] = Math.min(maxColWidth, Math.max(minColWidth, colWidth));
      padding[colIndex] = Array.isArray(this.options.padding)
        ? this.options.padding[colIndex]
        : this.options.padding;
    }
    return {
      padding,
      width,
      rows,
      columns,
      hasBorder,
      hasBodyBorder,
      hasHeaderBorder,
    };
  }
  spanRows(_rows, rowIndex = 0, colIndex = 0, rowSpan = [], colSpan = 1) {
    const rows = _rows;
    if (rowIndex >= rows.length && rowSpan.every((span) => span === 1)) {
      return rows;
    } else if (
      rows[rowIndex] && colIndex >= rows[rowIndex].length &&
      colIndex >= rowSpan.length && colSpan === 1
    ) {
      return this.spanRows(rows, ++rowIndex, 0, rowSpan, 1);
    }
    if (colSpan > 1) {
      colSpan--;
      rowSpan[colIndex] = rowSpan[colIndex - 1];
      rows[rowIndex].splice(colIndex - 1, 0, rows[rowIndex][colIndex - 1]);
      return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
    }
    if (colIndex === 0) {
      rows[rowIndex] = this.createRow(rows[rowIndex] || []);
    }
    if (rowSpan[colIndex] > 1) {
      rowSpan[colIndex]--;
      rows[rowIndex].splice(colIndex, 0, rows[rowIndex - 1][colIndex]);
      return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
    }
    rows[rowIndex][colIndex] = this.createCell(
      rows[rowIndex][colIndex] || null,
      rows[rowIndex],
    );
    colSpan = rows[rowIndex][colIndex].getColSpan();
    rowSpan[colIndex] = rows[rowIndex][colIndex].getRowSpan();
    return this.spanRows(rows, rowIndex, ++colIndex, rowSpan, colSpan);
  }
  createRow(row) {
    return Row.from(row).border(this.table.getBorder(), false);
  }
  createCell(cell, row) {
    return Cell.from(cell ?? "").border(row.getBorder(), false);
  }
  renderRows(opts) {
    let result = "";
    const rowSpan = new Array(opts.columns).fill(1);
    for (let rowIndex = 0; rowIndex < opts.rows.length; rowIndex++) {
      result += this.renderRow(rowSpan, rowIndex, opts);
    }
    return result.slice(0, -1);
  }
  renderRow(rowSpan, rowIndex, opts, isMultiline) {
    const row = opts.rows[rowIndex];
    const prevRow = opts.rows[rowIndex - 1];
    const nextRow = opts.rows[rowIndex + 1];
    let result = "";
    let colSpan = 1;
    if (!isMultiline && rowIndex === 0 && row.hasBorder()) {
      result += this.renderBorderRow(undefined, row, rowSpan, opts);
    }
    let isMultilineRow = false;
    result += " ".repeat(this.options.indent || 0);
    for (let colIndex = 0; colIndex < opts.columns; colIndex++) {
      if (colSpan > 1) {
        colSpan--;
        rowSpan[colIndex] = rowSpan[colIndex - 1];
        continue;
      }
      result += this.renderCell(colIndex, row, prevRow, rowSpan, opts);
      if (rowSpan[colIndex] > 1) {
        if (!isMultiline) {
          rowSpan[colIndex]--;
        }
      } else if (!prevRow || prevRow[colIndex] !== row[colIndex]) {
        rowSpan[colIndex] = row[colIndex].getRowSpan();
      }
      colSpan = row[colIndex].getColSpan();
      if (rowSpan[colIndex] === 1 && row[colIndex].length) {
        isMultilineRow = true;
      }
    }
    if (opts.columns > 0) {
      if (row[opts.columns - 1].getBorder()) {
        result += this.options.chars.right;
      } else if (opts.hasBorder) {
        result += " ";
      }
    }
    result += "\n";
    if (isMultilineRow) {
      return result + this.renderRow(rowSpan, rowIndex, opts, isMultilineRow);
    }
    if (
      rowIndex === 0 && opts.hasHeaderBorder ||
      rowIndex < opts.rows.length - 1 && opts.hasBodyBorder
    ) {
      result += this.renderBorderRow(row, nextRow, rowSpan, opts);
    }
    if (rowIndex === opts.rows.length - 1 && row.hasBorder()) {
      result += this.renderBorderRow(row, undefined, rowSpan, opts);
    }
    return result;
  }
  renderCell(colIndex, row, prevRow, rowSpan, opts, noBorder) {
    let result = "";
    const prevCell = row[colIndex - 1];
    const cell = row[colIndex];
    if (!noBorder) {
      if (colIndex === 0) {
        if (cell.getBorder()) {
          result += this.options.chars.left;
        } else if (opts.hasBorder) {
          result += " ";
        }
      } else {
        if (cell.getBorder() || prevCell?.getBorder()) {
          result += this.options.chars.middle;
        } else if (opts.hasBorder) {
          result += " ";
        }
      }
    }
    let maxLength = opts.width[colIndex];
    const colSpan = cell.getColSpan();
    if (colSpan > 1) {
      for (let o = 1; o < colSpan; o++) {
        maxLength += opts.width[colIndex + o] + opts.padding[colIndex + o];
        if (opts.hasBorder) {
          maxLength += opts.padding[colIndex + o] + 1;
        }
      }
    }
    const { current, next } = this.renderCellValue(cell, maxLength);
    row[colIndex].setValue(next);
    if (opts.hasBorder) {
      result += " ".repeat(opts.padding[colIndex]);
    }
    result += current;
    if (opts.hasBorder || colIndex < opts.columns - 1) {
      result += " ".repeat(opts.padding[colIndex]);
    }
    return result;
  }
  renderCellValue(cell, maxLength) {
    const length = Math.min(maxLength, stripColor1(cell.toString()).length);
    let words = consumeWords(length, cell.toString());
    const breakWord = stripColor1(words).length > length;
    if (breakWord) {
      words = words.slice(0, length);
    }
    const next = cell.toString().slice(words.length + (breakWord ? 0 : 1));
    const fillLength = maxLength - stripColor1(words).length;
    const current = words + " ".repeat(fillLength);
    return {
      current,
      next: cell.clone(next),
    };
  }
  renderBorderRow(prevRow, nextRow, rowSpan, opts) {
    let result = "";
    let colSpan = 1;
    for (let colIndex = 0; colIndex < opts.columns; colIndex++) {
      if (rowSpan[colIndex] > 1) {
        if (!nextRow) {
          throw new Error("invalid layout");
        }
        if (colSpan > 1) {
          colSpan--;
          continue;
        }
      }
      result += this.renderBorderCell(
        colIndex,
        prevRow,
        nextRow,
        rowSpan,
        opts,
      );
      colSpan = nextRow?.[colIndex].getColSpan() ?? 1;
    }
    return result.length ? " ".repeat(this.options.indent) + result + "\n" : "";
  }
  renderBorderCell(colIndex, prevRow, nextRow, rowSpan, opts) {
    const a1 = prevRow?.[colIndex - 1];
    const a2 = nextRow?.[colIndex - 1];
    const b1 = prevRow?.[colIndex];
    const b2 = nextRow?.[colIndex];
    const a1Border = !!a1?.getBorder();
    const a2Border = !!a2?.getBorder();
    const b1Border = !!b1?.getBorder();
    const b2Border = !!b2?.getBorder();
    const hasColSpan = (cell) => (cell?.getColSpan() ?? 1) > 1;
    const hasRowSpan = (cell) => (cell?.getRowSpan() ?? 1) > 1;
    let result = "";
    if (colIndex === 0) {
      if (rowSpan[colIndex] > 1) {
        if (b1Border) {
          result += this.options.chars.left;
        } else {
          result += " ";
        }
      } else if (b1Border && b2Border) {
        result += this.options.chars.leftMid;
      } else if (b1Border) {
        result += this.options.chars.bottomLeft;
      } else if (b2Border) {
        result += this.options.chars.topLeft;
      } else {
        result += " ";
      }
    } else if (colIndex < opts.columns) {
      if (a1Border && b2Border || b1Border && a2Border) {
        const a1ColSpan = hasColSpan(a1);
        const a2ColSpan = hasColSpan(a2);
        const b1ColSpan = hasColSpan(b1);
        const b2ColSpan = hasColSpan(b2);
        const a1RowSpan = hasRowSpan(a1);
        const a2RowSpan = hasRowSpan(a2);
        const b1RowSpan = hasRowSpan(b1);
        const b2RowSpan = hasRowSpan(b2);
        const hasAllBorder = a1Border && b2Border && b1Border && a2Border;
        const hasAllRowSpan = a1RowSpan && b1RowSpan && a2RowSpan && b2RowSpan;
        const hasAllColSpan = a1ColSpan && b1ColSpan && a2ColSpan && b2ColSpan;
        if (hasAllRowSpan && hasAllBorder) {
          result += this.options.chars.middle;
        } else if (hasAllColSpan && hasAllBorder && a1 === b1 && a2 === b2) {
          result += this.options.chars.mid;
        } else if (a1ColSpan && b1ColSpan && a1 === b1) {
          result += this.options.chars.topMid;
        } else if (a2ColSpan && b2ColSpan && a2 === b2) {
          result += this.options.chars.bottomMid;
        } else if (a1RowSpan && a2RowSpan && a1 === a2) {
          result += this.options.chars.leftMid;
        } else if (b1RowSpan && b2RowSpan && b1 === b2) {
          result += this.options.chars.rightMid;
        } else {
          result += this.options.chars.midMid;
        }
      } else if (a1Border && b1Border) {
        if (hasColSpan(a1) && hasColSpan(b1) && a1 === b1) {
          result += this.options.chars.bottom;
        } else {
          result += this.options.chars.bottomMid;
        }
      } else if (b1Border && b2Border) {
        if (rowSpan[colIndex] > 1) {
          result += this.options.chars.left;
        } else {
          result += this.options.chars.leftMid;
        }
      } else if (b2Border && a2Border) {
        if (hasColSpan(a2) && hasColSpan(b2) && a2 === b2) {
          result += this.options.chars.top;
        } else {
          result += this.options.chars.topMid;
        }
      } else if (a1Border && a2Border) {
        if (hasRowSpan(a1) && a1 === a2) {
          result += this.options.chars.right;
        } else {
          result += this.options.chars.rightMid;
        }
      } else if (a1Border) {
        result += this.options.chars.bottomRight;
      } else if (b1Border) {
        result += this.options.chars.bottomLeft;
      } else if (a2Border) {
        result += this.options.chars.topRight;
      } else if (b2Border) {
        result += this.options.chars.topLeft;
      } else {
        result += " ";
      }
    }
    const length = opts.padding[colIndex] + opts.width[colIndex] +
      opts.padding[colIndex];
    if (rowSpan[colIndex] > 1 && nextRow) {
      result += this.renderCell(
        colIndex,
        nextRow,
        prevRow,
        rowSpan,
        opts,
        true,
      );
      if (nextRow[colIndex] === nextRow[nextRow.length - 1]) {
        if (b1Border) {
          result += this.options.chars.right;
        } else {
          result += " ";
        }
        return result;
      }
    } else if (b1Border && b2Border) {
      result += this.options.chars.mid.repeat(length);
    } else if (b1Border) {
      result += this.options.chars.bottom.repeat(length);
    } else if (b2Border) {
      result += this.options.chars.top.repeat(length);
    } else {
      result += " ".repeat(length);
    }
    if (colIndex === opts.columns - 1) {
      if (b1Border && b2Border) {
        result += this.options.chars.rightMid;
      } else if (b1Border) {
        result += this.options.chars.bottomRight;
      } else if (b2Border) {
        result += this.options.chars.topRight;
      } else {
        result += " ";
      }
    }
    return result;
  }
}
class Table extends Array {
  static _chars = {
    ...border,
  };
  options = {
    indent: 0,
    border: false,
    maxColWidth: Infinity,
    minColWidth: 0,
    padding: 1,
    chars: {
      ...Table._chars,
    },
  };
  static from(rows) {
    const table1 = new this(...rows);
    if (rows instanceof Table) {
      table1.options = {
        ...rows.options,
      };
      table1.headerRow = rows.headerRow ? Row.from(rows.headerRow) : undefined;
    }
    return table1;
  }
  static fromJson(rows) {
    return new this().fromJson(rows);
  }
  static chars(chars) {
    Object.assign(this._chars, chars);
    return this;
  }
  static render(rows) {
    Table.from(rows).render();
  }
  fromJson(rows) {
    this.header(Object.keys(rows[0]));
    this.body(rows.map((row) => Object.values(row)));
    return this;
  }
  header(header) {
    this.headerRow = header instanceof Row ? header : Row.from(header);
    return this;
  }
  body(rows) {
    this.length = 0;
    this.push(...rows);
    return this;
  }
  clone() {
    const table1 = new Table(
      ...this.map((row) =>
        row instanceof Row ? row.clone() : Row.from(row).clone()
      ),
    );
    table1.options = {
      ...this.options,
    };
    table1.headerRow = this.headerRow?.clone();
    return table1;
  }
  toString() {
    return new TableLayout(this, this.options).toString();
  }
  render() {
    Deno.stdout.writeSync(new TextEncoder().encode(this.toString() + "\n"));
    return this;
  }
  maxColWidth(width, override = true) {
    if (override || typeof this.options.maxColWidth === "undefined") {
      this.options.maxColWidth = width;
    }
    return this;
  }
  minColWidth(width, override = true) {
    if (override || typeof this.options.minColWidth === "undefined") {
      this.options.minColWidth = width;
    }
    return this;
  }
  indent(width, override = true) {
    if (override || typeof this.options.indent === "undefined") {
      this.options.indent = width;
    }
    return this;
  }
  padding(padding, override = true) {
    if (override || typeof this.options.padding === "undefined") {
      this.options.padding = padding;
    }
    return this;
  }
  border(enable, override = true) {
    if (override || typeof this.options.border === "undefined") {
      this.options.border = enable;
    }
    return this;
  }
  chars(chars) {
    Object.assign(this.options.chars, chars);
    return this;
  }
  getHeader() {
    return this.headerRow;
  }
  getBody() {
    return this.slice();
  }
  getMaxColWidth() {
    return this.options.maxColWidth;
  }
  getMinColWidth() {
    return this.options.minColWidth;
  }
  getIndent() {
    return this.options.indent;
  }
  getPadding() {
    return this.options.padding;
  }
  getBorder() {
    return this.options.border === true;
  }
  hasHeaderBorder() {
    return this.getBorder() ||
      this.headerRow instanceof Row && this.headerRow.hasBorder();
  }
  hasBodyBorder() {
    return this.getBorder() ||
      this.some((row) =>
        row instanceof Row
          ? row.hasBorder()
          : row.some((cell) => cell instanceof Cell ? cell.getBorder : false)
      );
  }
  hasBorder() {
    return this.hasHeaderBorder() || this.hasBodyBorder();
  }
}
class HelpGenerator {
  indent = 2;
  static generate(cmd, options) {
    return new HelpGenerator(cmd, options).generate();
  }
  constructor(cmd1, options21 = {}) {
    this.cmd = cmd1;
    this.options = {
      types: false,
      hints: true,
      ...options21,
    };
  }
  generate() {
    return this.generateHeader() + this.generateDescription() +
      this.generateOptions() + this.generateCommands() +
      this.generateEnvironmentVariables() + this.generateExamples() + "\n";
  }
  generateHeader() {
    const rows = [
      [
        bold2("Usage:"),
        magenta1(
          `${this.cmd.getPath()}${
            this.cmd.getArgsDefinition()
              ? " " + this.cmd.getArgsDefinition()
              : ""
          }`,
        ),
      ],
    ];
    const version = this.cmd.getVersion();
    if (version) {
      rows.push([
        bold2("Version:"),
        yellow1(`v${this.cmd.getVersion()}`),
      ]);
    }
    return "\n" + Table.from(rows).indent(this.indent).padding(1).toString() +
      "\n";
  }
  generateDescription() {
    if (!this.cmd.getDescription()) {
      return "";
    }
    return this.label("Description") + Table.from([
      [
        this.cmd.getDescription(),
      ],
    ]).indent(this.indent * 2).maxColWidth(140).padding(1).toString() + "\n";
  }
  generateOptions() {
    const options22 = this.cmd.getOptions(false);
    if (!options22.length) {
      return "";
    }
    const hasTypeDefinitions = !!options22.find((option9) =>
      !!option9.typeDefinition
    );
    if (hasTypeDefinitions) {
      return this.label("Options") + Table.from([
        ...options22.map((option9) => [
          option9.flags.map((flag) => blue1(flag)).join(", "),
          highlightArguments(option9.typeDefinition || "", this.options.types),
          red2(bold2("-")) + " " + option9.description.split("\n").shift(),
          this.generateHints(option9),
        ]),
      ]).padding([
        2,
        2,
        2,
      ]).indent(this.indent * 2).maxColWidth([
        60,
        60,
        80,
        60,
      ]).toString() + "\n";
    }
    return this.label("Options") + Table.from([
      ...options22.map((option9) => [
        option9.flags.map((flag) => blue1(flag)).join(", "),
        red2(bold2("-")) + " " + option9.description.split("\n").shift(),
        this.generateHints(option9),
      ]),
    ]).padding([
      2,
      2,
    ]).indent(this.indent * 2).maxColWidth([
      60,
      80,
      60,
    ]).toString() + "\n";
  }
  generateCommands() {
    const commands4 = this.cmd.getCommands(false);
    if (!commands4.length) {
      return "";
    }
    const hasTypeDefinitions = !!commands4.find((command) =>
      !!command.getArgsDefinition()
    );
    if (hasTypeDefinitions) {
      return this.label("Commands") + Table.from([
        ...commands4.map((command) => [
          [
            command.getName(),
            ...command.getAliases(),
          ].map((name16) => blue1(name16)).join(", "),
          highlightArguments(
            command.getArgsDefinition() || "",
            this.options.types,
          ),
          red2(bold2("-")) + " " + command.getDescription().split("\n").shift(),
        ]),
      ]).padding([
        2,
        2,
        2,
      ]).indent(this.indent * 2).toString() + "\n";
    }
    return this.label("Commands") + Table.from([
      ...commands4.map((command) => [
        [
          command.getName(),
          ...command.getAliases(),
        ].map((name16) => blue1(name16)).join(", "),
        red2(bold2("-")) + " " + command.getDescription().split("\n").shift(),
      ]),
    ]).padding([
      2,
      2,
    ]).indent(this.indent * 2).toString() + "\n";
  }
  generateEnvironmentVariables() {
    const envVars = this.cmd.getEnvVars(false);
    if (!envVars.length) {
      return "";
    }
    return this.label("Environment variables") + Table.from([
      ...envVars.map((envVar) => [
        envVar.names.map((name16) => blue1(name16)).join(", "),
        highlightArgumentDetails(envVar.details, this.options.types),
        `${red2(bold2("-"))} ${envVar.description}`,
      ]),
    ]).padding(2).indent(this.indent * 2).toString() + "\n";
  }
  generateExamples() {
    const examples = this.cmd.getExamples();
    if (!examples.length) {
      return "";
    }
    return this.label("Examples") + Table.from(examples.map((example) => [
      dim1(bold2(`${capitalize(example.name)}:`)),
      example.description,
    ])).padding(1).indent(this.indent * 2).maxColWidth(150).toString() + "\n";
  }
  generateHints(option) {
    if (!this.options.hints) {
      return "";
    }
    const hints = [];
    option.required && hints.push(yellow1(`required`));
    typeof option.default !== "undefined" &&
      hints.push(bold2(`Default: `) + inspect(option.default));
    option.depends?.length &&
      hints.push(
        yellow1(bold2(`Depends: `)) +
          italic1(option.depends.map(getFlag).join(", ")),
      );
    option.conflicts?.length &&
      hints.push(
        red2(bold2(`Conflicts: `)) +
          italic1(option.conflicts.map(getFlag).join(", ")),
      );
    if (hints.length) {
      return `(${hints.join(", ")})`;
    }
    return "";
  }
  label(label) {
    return "\n" + " ".repeat(this.indent) + bold2(`${label}:`) + "\n\n";
  }
}
function capitalize(string1) {
  return (string1?.charAt(0).toUpperCase() + string1.slice(1)) ?? "";
}
function inspect(value3) {
  return Deno.inspect(value3, {
    depth: 1,
    colors: true,
    trailingComma: false,
  });
}
function highlightArguments(argsDefinition, types1 = true) {
  if (!argsDefinition) {
    return "";
  }
  return parseArgumentsDefinition(argsDefinition).map((arg3) =>
    highlightArgumentDetails(arg3, types1)
  ).join(" ");
}
function highlightArgumentDetails(arg3, types1 = true) {
  let str = "";
  str += yellow1(arg3.optionalValue ? "[" : "<");
  let name16 = "";
  name16 += arg3.name;
  if (arg3.variadic) {
    name16 += "...";
  }
  name16 = magenta1(name16);
  str += name16;
  if (types1) {
    str += yellow1(":");
    str += red2(arg3.type);
  }
  if (arg3.list) {
    str += green1("[]");
  }
  str += yellow1(arg3.optionalValue ? "]" : ">");
  return str;
}
class Command {
  types = new Map([
    [
      "string",
      {
        name: "string",
        handler: new StringType(),
      },
    ],
    [
      "number",
      {
        name: "number",
        handler: new NumberType(),
      },
    ],
    [
      "boolean",
      {
        name: "boolean",
        handler: new BooleanType(),
      },
    ],
  ]);
  rawArgs = [];
  literalArgs = [];
  _name = "COMMAND";
  desc = "";
  options = [];
  commands = new Map();
  examples = [];
  envVars = [];
  aliases = [];
  completions = new Map();
  cmd = this;
  isExecutable = false;
  throwOnError = false;
  _allowEmpty = true;
  _stopEarly = false;
  _useRawArgs = false;
  args = [];
  isHidden = false;
  isGlobal = false;
  hasDefaults = false;
  versionOption(flags, desc, opts) {
    this._versionOption = flags === false ? flags : {
      flags,
      desc,
      opts: typeof opts === "function"
        ? {
          action: opts,
        }
        : opts,
    };
    return this;
  }
  helpOption(flags, desc, opts) {
    this._helpOption = flags === false ? flags : {
      flags,
      desc,
      opts: typeof opts === "function"
        ? {
          action: opts,
        }
        : opts,
    };
    return this;
  }
  command(nameAndArguments, cmdOrDescription, override) {
    const result = splitArguments(nameAndArguments);
    const name16 = result.flags.shift();
    const aliases = result.flags;
    if (!name16) {
      throw new MissingCommandName();
    }
    if (this.getBaseCommand(name16, true)) {
      if (!override) {
        throw new DuplicateCommandName(name16);
      }
      this.removeCommand(name16);
    }
    let description;
    let cmd2;
    if (typeof cmdOrDescription === "string") {
      description = cmdOrDescription;
    }
    if (cmdOrDescription instanceof Command) {
      cmd2 = cmdOrDescription.reset();
    } else {
      cmd2 = new Command();
    }
    cmd2._name = name16;
    cmd2._parent = this;
    if (description) {
      cmd2.description(description);
    }
    if (result.typeDefinition) {
      cmd2.arguments(result.typeDefinition);
    }
    aliases.forEach((alias1) => cmd2.aliases.push(alias1));
    this.commands.set(name16, cmd2);
    this.select(name16);
    return this;
  }
  alias(alias) {
    if (this.cmd.aliases.indexOf(alias) !== -1) {
      throw new DuplicateCommandAlias(alias);
    }
    this.cmd.aliases.push(alias);
    return this;
  }
  reset() {
    this.cmd = this;
    return this;
  }
  select(name) {
    const cmd2 = this.getBaseCommand(name, true);
    if (!cmd2) {
      throw new CommandNotFound(name, this.getBaseCommands(true));
    }
    this.cmd = cmd2;
    return this;
  }
  name(name) {
    this.cmd._name = name;
    return this;
  }
  version(version) {
    this.cmd.ver = version;
    return this;
  }
  help(help) {
    if (typeof help === "string") {
      this.cmd._help = () => help;
    } else if (typeof help === "function") {
      this.cmd._help = help;
    } else {
      this.cmd._help = (cmd2) => HelpGenerator.generate(cmd2, help);
    }
    return this;
  }
  description(description) {
    this.cmd.desc = description;
    return this;
  }
  hidden() {
    this.cmd.isHidden = true;
    return this;
  }
  global() {
    this.cmd.isGlobal = true;
    return this;
  }
  executable() {
    this.cmd.isExecutable = true;
    return this;
  }
  arguments(args) {
    this.cmd.argsDefinition = args;
    return this;
  }
  action(fn) {
    this.cmd.fn = fn;
    return this;
  }
  allowEmpty(allowEmpty = true) {
    this.cmd._allowEmpty = allowEmpty;
    return this;
  }
  stopEarly(stopEarly = true) {
    this.cmd._stopEarly = stopEarly;
    return this;
  }
  useRawArgs(useRawArgs = true) {
    this.cmd._useRawArgs = useRawArgs;
    return this;
  }
  default(name) {
    this.cmd.defaultCommand = name;
    return this;
  }
  globalType(name, type, options) {
    return this.type(name, type, {
      ...options,
      global: true,
    });
  }
  type(name, handler, options) {
    if (this.cmd.types.get(name) && !options?.override) {
      throw new DuplicateType(name);
    }
    this.cmd.types.set(name, {
      ...options,
      name,
      handler,
    });
    if (handler instanceof Type && typeof handler.complete !== "undefined") {
      this.complete(
        name,
        (cmd2, parent) => handler.complete?.(cmd2, parent) || [],
        options,
      );
    }
    return this;
  }
  globalComplete(name, complete, options) {
    return this.complete(name, complete, {
      ...options,
      global: true,
    });
  }
  complete(name, complete, options) {
    if (this.cmd.completions.has(name) && !options?.override) {
      throw new DuplicateCompletion(name);
    }
    this.cmd.completions.set(name, {
      name,
      complete,
      ...options,
    });
    return this;
  }
  throwErrors() {
    this.cmd.throwOnError = true;
    return this;
  }
  shouldThrowErrors() {
    return this.cmd.throwOnError || !!this.cmd._parent?.shouldThrowErrors();
  }
  globalOption(flags, desc, opts) {
    if (typeof opts === "function") {
      return this.option(flags, desc, {
        value: opts,
        global: true,
      });
    }
    return this.option(flags, desc, {
      ...opts,
      global: true,
    });
  }
  option(flags, desc, opts) {
    if (typeof opts === "function") {
      return this.option(flags, desc, {
        value: opts,
      });
    }
    const result = splitArguments(flags);
    const args3 = result.typeDefinition
      ? parseArgumentsDefinition(result.typeDefinition)
      : [];
    const option10 = {
      ...opts,
      name: "",
      description: desc,
      args: args3,
      flags: result.flags,
      typeDefinition: result.typeDefinition,
    };
    if (option10.separator) {
      for (const arg3 of args3) {
        if (arg3.list) {
          arg3.separator = option10.separator;
        }
      }
    }
    for (const part of option10.flags) {
      const arg3 = part.trim();
      const isLong = /^--/.test(arg3);
      const name17 = isLong ? arg3.slice(2) : arg3.slice(1);
      if (
        option10.name === name17 ||
        option10.aliases && ~option10.aliases.indexOf(name17)
      ) {
        throw new DuplicateOptionName(name17);
      }
      if (!option10.name && isLong) {
        option10.name = name17;
      } else if (!option10.aliases) {
        option10.aliases = [
          name17,
        ];
      } else {
        option10.aliases.push(name17);
      }
      if (this.cmd.getBaseOption(name17, true)) {
        if (opts?.override) {
          this.removeOption(name17);
        } else {
          throw new DuplicateOptionName(name17);
        }
      }
    }
    if (option10.prepend) {
      this.cmd.options.unshift(option10);
    } else {
      this.cmd.options.push(option10);
    }
    return this;
  }
  example(name, description) {
    if (this.cmd.hasExample(name)) {
      throw new DuplicateExample(name);
    }
    this.cmd.examples.push({
      name,
      description,
    });
    return this;
  }
  globalEnv(name, description, options) {
    return this.env(name, description, {
      ...options,
      global: true,
    });
  }
  env(name, description, options) {
    const result = splitArguments(name);
    if (!result.typeDefinition) {
      result.typeDefinition = "<value:boolean>";
    }
    if (result.flags.some((envName) => this.cmd.getBaseEnvVar(envName, true))) {
      throw new DuplicateEnvironmentVariable(name);
    }
    const details = parseArgumentsDefinition(result.typeDefinition);
    if (details.length > 1) {
      throw new EnvironmentVariableSingleValue(name);
    } else if (details.length && details[0].optionalValue) {
      throw new EnvironmentVariableOptionalValue(name);
    } else if (details.length && details[0].variadic) {
      throw new EnvironmentVariableVariadicValue(name);
    }
    this.cmd.envVars.push({
      names: result.flags,
      description,
      type: details[0].type,
      details: details.shift(),
      ...options,
    });
    return this;
  }
  async parse(args = Deno.args, dry) {
    try {
      this.reset();
      this.registerDefaults();
      this.rawArgs = args;
      const subCommand = args.length > 0 && this.getCommand(args[0], true);
      if (subCommand) {
        subCommand._globalParent = this;
        return await subCommand.parse(this.rawArgs.slice(1), dry);
      }
      const result = {
        options: {},
        args: this.rawArgs,
        cmd: this,
        literal: this.literalArgs,
      };
      if (this.isExecutable) {
        if (!dry) {
          await this.executeExecutable(this.rawArgs);
        }
        return result;
      } else if (this._useRawArgs) {
        if (dry) {
          return result;
        }
        return await this.execute({}, ...this.rawArgs);
      } else {
        const { action, flags, unknown, literal } = this.parseFlags(
          this.rawArgs,
        );
        this.literalArgs = literal;
        const params = this.parseArguments(unknown, flags);
        await this.validateEnvVars();
        if (dry || action) {
          if (action) {
            await action.call(this, flags, ...params);
          }
          return {
            options: flags,
            args: params,
            cmd: this,
            literal: this.literalArgs,
          };
        }
        return await this.execute(flags, ...params);
      }
    } catch (error1) {
      throw this.error(error1);
    }
  }
  registerDefaults() {
    if (this.hasDefaults || this.getParent()) {
      return this;
    }
    this.hasDefaults = true;
    this.reset();
    if (!this._help) {
      this.help({
        hints: true,
        types: false,
      });
    }
    if (this.ver && this._versionOption !== false) {
      this.option(
        this._versionOption?.flags || "-V, --version",
        this._versionOption?.desc ||
          "Show the version number for this program.",
        {
          standalone: true,
          prepend: true,
          action: async function () {
            await Deno.stdout.write(new TextEncoder().encode(this.ver + "\n"));
            Deno.exit(0);
          },
          ...this._versionOption?.opts ?? {},
        },
      );
    }
    if (this._helpOption !== false) {
      this.option(
        this._helpOption?.flags || "-h, --help",
        this._helpOption?.desc || "Show this help.",
        {
          standalone: true,
          global: true,
          prepend: true,
          action: function () {
            this.showHelp();
            Deno.exit(0);
          },
          ...this._helpOption?.opts ?? {},
        },
      );
    }
    return this;
  }
  async execute(options, ...args) {
    if (this.fn) {
      await this.fn(options, ...args);
    } else if (this.defaultCommand) {
      const cmd2 = this.getCommand(this.defaultCommand, true);
      if (!cmd2) {
        throw new DefaultCommandNotFound(
          this.defaultCommand,
          this.getCommands(),
        );
      }
      cmd2._globalParent = this;
      await cmd2.execute(options, ...args);
    }
    return {
      options,
      args,
      cmd: this,
      literal: this.literalArgs,
    };
  }
  async executeExecutable(args) {
    const permissions = await getPermissions();
    if (!permissions.read) {
      await Deno.permissions?.request({
        name: "read",
      });
    }
    if (!permissions.run) {
      await Deno.permissions?.request({
        name: "run",
      });
    }
    const [main, ...names] = this.getPath().split(" ");
    names.unshift(main.replace(/\.ts$/, ""));
    const executableName = names.join("-");
    const files1 = [];
    const parts = Deno.mainModule.replace(/^file:\/\//g, "").split("/");
    parts.pop();
    const path = parts.join("/");
    files1.push(
      path + "/" + executableName,
      path + "/" + executableName + ".ts",
    );
    files1.push(executableName, executableName + ".ts");
    const denoOpts = [];
    if (isUnstable()) {
      denoOpts.push("--unstable");
    }
    denoOpts.push("--allow-read", "--allow-run");
    Object.keys(permissions).forEach((name17) => {
      if (name17 === "read" || name17 === "run") {
        return;
      }
      if (permissions[name17]) {
        denoOpts.push(`--allow-${name17}`);
      }
    });
    for (const file of files1) {
      if (!existsSync(file)) {
        continue;
      }
      const cmd2 = [
        "deno",
        "run",
        ...denoOpts,
        file,
        ...args,
      ];
      const process1 = Deno.run({
        cmd: cmd2,
      });
      const status = await process1.status();
      if (!status.success) {
        Deno.exit(status.code);
      }
      return;
    }
    throw new CommandExecutableNotFound(executableName, files1);
  }
  parseFlags(args) {
    let action;
    const result = parseFlags(args, {
      stopEarly: this._stopEarly,
      allowEmpty: this._allowEmpty,
      flags: this.getOptions(true),
      parse: (type2) => this.parseType(type2),
      option: (option10) => {
        if (!action && option10.action) {
          action = option10.action;
        }
      },
    });
    return {
      ...result,
      action,
    };
  }
  parseType(type) {
    const typeSettings = this.getType(type.type);
    if (!typeSettings) {
      throw new UnknownType(
        type.type,
        this.getTypes().map((type2) => type2.name),
      );
    }
    return typeSettings.handler instanceof Type
      ? typeSettings.handler.parse(type)
      : typeSettings.handler(type);
  }
  async validateEnvVars() {
    if (!await hasPermission("env")) {
      return;
    }
    const envVars = this.getEnvVars(true);
    if (!envVars.length) {
      return;
    }
    envVars.forEach((env) => {
      const name17 = env.names.find((name18) => !!Deno.env.get(name18));
      if (name17) {
        this.parseType({
          label: "Environment variable",
          type: env.type,
          name: name17,
          value: Deno.env.get(name17) ?? "",
        });
      }
    });
  }
  parseArguments(args, flags) {
    const params = [];
    args = args.slice(0);
    if (!this.hasArguments()) {
      if (args.length) {
        if (this.hasCommands(true)) {
          throw new UnknownCommand(args[0], this.getCommands());
        } else {
          throw new NoArgumentsAllowed(this.getPath());
        }
      }
    } else {
      if (!args.length) {
        const required = this.getArguments().filter((expectedArg) =>
          !expectedArg.optionalValue
        ).map((expectedArg) => expectedArg.name);
        if (required.length) {
          const flagNames = Object.keys(flags);
          const hasStandaloneOption = !!flagNames.find((name17) =>
            this.getOption(name17, true)?.standalone
          );
          if (!hasStandaloneOption) {
            throw new MissingArguments(required);
          }
        }
      } else {
        for (const expectedArg of this.getArguments()) {
          if (!args.length) {
            if (expectedArg.optionalValue) {
              break;
            }
            throw new MissingArgument(`Missing argument: ${expectedArg.name}`);
          }
          let arg3;
          if (expectedArg.variadic) {
            arg3 = args.splice(0, args.length).map((value3) =>
              this.parseType({
                label: "Argument",
                type: expectedArg.type,
                name: expectedArg.name,
                value: value3,
              })
            );
          } else {
            arg3 = this.parseType({
              label: "Argument",
              type: expectedArg.type,
              name: expectedArg.name,
              value: args.shift(),
            });
          }
          if (arg3) {
            params.push(arg3);
          }
        }
        if (args.length) {
          throw new TooManyArguments(args);
        }
      }
    }
    return params;
  }
  error(error) {
    if (this.shouldThrowErrors() || !(error instanceof ValidationError)) {
      return error;
    }
    this.showHelp();
    Deno.stderr.writeSync(
      new TextEncoder().encode(
        red2(`  ${bold2("error")}: ${error.message}\n`) + "\n",
      ),
    );
    Deno.exit(1);
  }
  getName() {
    return this._name;
  }
  getParent() {
    return this._parent;
  }
  getGlobalParent() {
    return this._globalParent;
  }
  getMainCommand() {
    return this._parent?.getMainCommand() ?? this;
  }
  getAliases() {
    return this.aliases;
  }
  getPath() {
    return this._parent
      ? this._parent.getPath() + " " + this._name
      : this._name;
  }
  getArgsDefinition() {
    return this.argsDefinition;
  }
  getArgument(name) {
    return this.getArguments().find((arg3) => arg3.name === name);
  }
  getArguments() {
    if (!this.args.length && this.argsDefinition) {
      this.args = parseArgumentsDefinition(this.argsDefinition);
    }
    return this.args;
  }
  hasArguments() {
    return !!this.argsDefinition;
  }
  getVersion() {
    return this.ver ?? this._parent?.getVersion();
  }
  getDescription() {
    return typeof this.desc === "function"
      ? this.desc = this.desc()
      : this.desc;
  }
  getShortDescription() {
    return this.getDescription().trim().split("\n").shift();
  }
  getRawArgs() {
    return this.rawArgs;
  }
  getLiteralArgs() {
    return this.literalArgs;
  }
  showHelp() {
    Deno.stdout.writeSync(new TextEncoder().encode(this.getHelp()));
  }
  getHelp() {
    this.registerDefaults();
    return this.getHelpHandler().call(this, this);
  }
  getHelpHandler() {
    return this._help ?? this._parent?.getHelpHandler();
  }
  hasOptions(hidden) {
    return this.getOptions(hidden).length > 0;
  }
  getOptions(hidden) {
    return this.getGlobalOptions(hidden).concat(this.getBaseOptions(hidden));
  }
  getBaseOptions(hidden) {
    if (!this.options.length) {
      return [];
    }
    return hidden
      ? this.options.slice(0)
      : this.options.filter((opt) => !opt.hidden);
  }
  getGlobalOptions(hidden) {
    const getOptions = (cmd2, options22 = [], names = []) => {
      if (cmd2) {
        if (cmd2.options.length) {
          cmd2.options.forEach((option10) => {
            if (
              option10.global && !this.options.find((opt) =>
                opt.name === option10.name
              ) && names.indexOf(option10.name) === -1 &&
              (hidden || !option10.hidden)
            ) {
              names.push(option10.name);
              options22.push(option10);
            }
          });
        }
        return getOptions(cmd2._parent, options22, names);
      }
      return options22;
    };
    return getOptions(this._parent);
  }
  hasOption(name, hidden) {
    return !!this.getOption(name, hidden);
  }
  getOption(name, hidden) {
    return this.getBaseOption(name, hidden) ??
      this.getGlobalOption(name, hidden);
  }
  getBaseOption(name, hidden) {
    const option10 = this.options.find((option11) => option11.name === name);
    return option10 && (hidden || !option10.hidden) ? option10 : undefined;
  }
  getGlobalOption(name, hidden) {
    if (!this._parent) {
      return;
    }
    const option10 = this._parent.getBaseOption(name, hidden);
    if (!option10 || !option10.global) {
      return this._parent.getGlobalOption(name, hidden);
    }
    return option10;
  }
  removeOption(name) {
    const index = this.options.findIndex((option10) => option10.name === name);
    if (index === -1) {
      return;
    }
    return this.options.splice(index, 1)[0];
  }
  hasCommands(hidden) {
    return this.getCommands(hidden).length > 0;
  }
  getCommands(hidden) {
    return this.getGlobalCommands(hidden).concat(this.getBaseCommands(hidden));
  }
  getBaseCommands(hidden) {
    const commands5 = Array.from(this.commands.values());
    return hidden ? commands5 : commands5.filter((cmd2) => !cmd2.isHidden);
  }
  getGlobalCommands(hidden) {
    const getCommands = (cmd2, commands5 = [], names = []) => {
      if (cmd2) {
        if (cmd2.commands.size) {
          cmd2.commands.forEach((cmd3) => {
            if (
              cmd3.isGlobal && this !== cmd3 &&
              !this.commands.has(cmd3._name) &&
              names.indexOf(cmd3._name) === -1 && (hidden || !cmd3.isHidden)
            ) {
              names.push(cmd3._name);
              commands5.push(cmd3);
            }
          });
        }
        return getCommands(cmd2._parent, commands5, names);
      }
      return commands5;
    };
    return getCommands(this._parent);
  }
  hasCommand(name, hidden) {
    return !!this.getCommand(name, hidden);
  }
  getCommand(name, hidden) {
    return this.getBaseCommand(name, hidden) ??
      this.getGlobalCommand(name, hidden);
  }
  getBaseCommand(name, hidden) {
    const cmd2 = this.commands.get(name);
    return cmd2 && (hidden || !cmd2.isHidden) ? cmd2 : undefined;
  }
  getGlobalCommand(name, hidden) {
    if (!this._parent) {
      return;
    }
    const cmd2 = this._parent.getBaseCommand(name, hidden);
    if (!cmd2?.isGlobal) {
      return this._parent.getGlobalCommand(name, hidden);
    }
    return cmd2;
  }
  removeCommand(name) {
    const command = this.getBaseCommand(name, true);
    if (command) {
      this.commands.delete(name);
    }
    return command;
  }
  getTypes() {
    return this.getGlobalTypes().concat(this.getBaseTypes());
  }
  getBaseTypes() {
    return Array.from(this.types.values());
  }
  getGlobalTypes() {
    const getTypes = (cmd2, types2 = [], names = []) => {
      if (cmd2) {
        if (cmd2.types.size) {
          cmd2.types.forEach((type2) => {
            if (
              type2.global && !this.types.has(type2.name) &&
              names.indexOf(type2.name) === -1
            ) {
              names.push(type2.name);
              types2.push(type2);
            }
          });
        }
        return getTypes(cmd2._parent, types2, names);
      }
      return types2;
    };
    return getTypes(this._parent);
  }
  getType(name) {
    return this.getBaseType(name) ?? this.getGlobalType(name);
  }
  getBaseType(name) {
    return this.types.get(name);
  }
  getGlobalType(name) {
    if (!this._parent) {
      return;
    }
    const cmd2 = this._parent.getBaseType(name);
    if (!cmd2?.global) {
      return this._parent.getGlobalType(name);
    }
    return cmd2;
  }
  getCompletions() {
    return this.getGlobalCompletions().concat(this.getBaseCompletions());
  }
  getBaseCompletions() {
    return Array.from(this.completions.values());
  }
  getGlobalCompletions() {
    const getCompletions = (cmd2, completions = [], names = []) => {
      if (cmd2) {
        if (cmd2.completions.size) {
          cmd2.completions.forEach((completion) => {
            if (
              completion.global && !this.completions.has(completion.name) &&
              names.indexOf(completion.name) === -1
            ) {
              names.push(completion.name);
              completions.push(completion);
            }
          });
        }
        return getCompletions(cmd2._parent, completions, names);
      }
      return completions;
    };
    return getCompletions(this._parent);
  }
  getCompletion(name) {
    return this.getBaseCompletion(name) ?? this.getGlobalCompletion(name);
  }
  getBaseCompletion(name) {
    return this.completions.get(name);
  }
  getGlobalCompletion(name) {
    if (!this._parent) {
      return;
    }
    const completion = this._parent.getBaseCompletion(name);
    if (!completion?.global) {
      return this._parent.getGlobalCompletion(name);
    }
    return completion;
  }
  hasEnvVars(hidden) {
    return this.getEnvVars(hidden).length > 0;
  }
  getEnvVars(hidden) {
    return this.getGlobalEnvVars(hidden).concat(this.getBaseEnvVars(hidden));
  }
  getBaseEnvVars(hidden) {
    if (!this.envVars.length) {
      return [];
    }
    return hidden
      ? this.envVars.slice(0)
      : this.envVars.filter((env) => !env.hidden);
  }
  getGlobalEnvVars(hidden) {
    const getEnvVars = (cmd2, envVars = [], names = []) => {
      if (cmd2) {
        if (cmd2.envVars.length) {
          cmd2.envVars.forEach((envVar) => {
            if (
              envVar.global && !this.envVars.find((env) =>
                env.names[0] === envVar.names[0]
              ) && names.indexOf(envVar.names[0]) === -1 &&
              (hidden || !envVar.hidden)
            ) {
              names.push(envVar.names[0]);
              envVars.push(envVar);
            }
          });
        }
        return getEnvVars(cmd2._parent, envVars, names);
      }
      return envVars;
    };
    return getEnvVars(this._parent);
  }
  hasEnvVar(name, hidden) {
    return !!this.getEnvVar(name, hidden);
  }
  getEnvVar(name, hidden) {
    return this.getBaseEnvVar(name, hidden) ??
      this.getGlobalEnvVar(name, hidden);
  }
  getBaseEnvVar(name, hidden) {
    const envVar = this.envVars.find((env) => env.names.indexOf(name) !== -1);
    return envVar && (hidden || !envVar.hidden) ? envVar : undefined;
  }
  getGlobalEnvVar(name, hidden) {
    if (!this._parent) {
      return;
    }
    const envVar = this._parent.getBaseEnvVar(name, hidden);
    if (!envVar?.global) {
      return this._parent.getGlobalEnvVar(name, hidden);
    }
    return envVar;
  }
  hasExamples() {
    return this.examples.length > 0;
  }
  getExamples() {
    return this.examples;
  }
  hasExample(name) {
    return !!this.getExample(name);
  }
  getExample(name) {
    return this.examples.find((example) => example.name === name);
  }
}
class BashCompletionsGenerator {
  static generate(cmd) {
    return new BashCompletionsGenerator(cmd).generate();
  }
  constructor(cmd2) {
    this.cmd = cmd2;
  }
  generate() {
    const path = this.cmd.getPath();
    const version = this.cmd.getVersion() ? ` v${this.cmd.getVersion()}` : "";
    return `#!/usr/bin/env bash\n# bash completion support for ${path}${version}\n\n_${
      replaceSpecialChars1(path)
    }() {\n  local word cur prev\n  local -a opts\n  COMPREPLY=()\n  cur="\${COMP_WORDS[COMP_CWORD]}"\n  prev="\${COMP_WORDS[COMP_CWORD-1]}"\n  cmd="_"\n  opts=()\n  \n  _${
      replaceSpecialChars1(this.cmd.getName())
    }_complete() {\n    local action="$1"; shift\n    mapfile -t values < <( ${this.cmd.getName()} completions complete "\${action}" "\${@}" )\n    for i in "\${values[@]}"; do\n      opts+=("$i")\n    done\n  }\n\n  ${
      this.generateCompletions(this.cmd).trim()
    }\n  \n  for word in "\${COMP_WORDS[@]}"; do\n    case "\${word}" in\n      -*) ;;\n      *) \n        cmd_tmp="\${cmd}_\${word//[^[:alnum:]]/_}"\n        if type "\${cmd_tmp}" &>/dev/null; then\n          cmd="\${cmd_tmp}"\n        fi\n    esac\n  done\n  \n  \${cmd}\n\n  if [[ \${#opts[@]} -eq 0 ]]; then\n    # shellcheck disable=SC2207\n    COMPREPLY=($(compgen -f "\${cur}"))\n    return 0\n  fi\n\n  local values\n  values="$( printf "\\n%s" "\${opts[@]}" )"\n  local IFS=$'\\n'\n  # shellcheck disable=SC2207\n  local result=($(compgen -W "\${values[@]}" -- "\${cur}"))\n  if [[ \${#result[@]} -eq 0 ]]; then\n    # shellcheck disable=SC2207\n    COMPREPLY=($(compgen -f "\${cur}"))\n  else\n    # shellcheck disable=SC2207\n    COMPREPLY=($(printf '%q\\n' "\${result[@]}"))\n  fi\n  \n  return 0\n}\n\ncomplete -F _${
      replaceSpecialChars1(path)
    } -o bashdefault -o default ${path}\n`;
  }
  generateCompletions(command, path = "", index = 1) {
    path = (path ? path + " " : "") + command.getName();
    const commandCompletions = this.generateCommandCompletions(
      command,
      path,
      index,
    );
    const childCommandCompletions = command.getCommands(false).filter((
      subCommand,
    ) => subCommand !== command).map((subCommand) =>
      this.generateCompletions(subCommand, path, index + 1)
    ).join("");
    return `${commandCompletions}\n\n${childCommandCompletions}`;
  }
  generateCommandCompletions(command, path, index) {
    const flags = this.getFlags(command);
    const childCommandNames = command.getCommands(false).map((childCommand) =>
      childCommand.getName()
    );
    const completionsPath = ~path.indexOf(" ")
      ? " " + path.split(" ").slice(1).join(" ")
      : "";
    const optionArguments = this.generateOptionArguments(
      command,
      completionsPath,
    );
    const completionsCmd = this.generateCommandCompletionsCommand(
      command.getArguments(),
      completionsPath,
    );
    return `  __${replaceSpecialChars1(path)}() {\n    opts=(${
      [
        ...flags,
        ...childCommandNames,
      ].join(" ")
    })\n    ${completionsCmd}\n    if [[ \${cur} == -* || \${COMP_CWORD} -eq ${index} ]] ; then\n      return 0\n    fi\n    ${optionArguments}\n  }`;
  }
  getFlags(command) {
    return command.getOptions(false).map((option10) => option10.flags).flat();
  }
  generateOptionArguments(command, completionsPath) {
    let opts2 = "";
    const options22 = command.getOptions(false);
    if (options22.length) {
      opts2 += 'case "${prev}" in';
      for (const option10 of options22) {
        const flags = option10.flags.map((flag) => flag.trim()).join("|");
        const completionsCmd = this.generateOptionCompletionsCommand(
          option10.args,
          completionsPath,
          {
            standalone: option10.standalone,
          },
        );
        opts2 += `\n      ${flags}) ${completionsCmd} ;;`;
      }
      opts2 += "\n    esac";
    }
    return opts2;
  }
  generateCommandCompletionsCommand(args, path) {
    if (args.length) {
      return `_${replaceSpecialChars1(this.cmd.getName())}_complete ${
        args[0].action
      }${path}`;
    }
    return "";
  }
  generateOptionCompletionsCommand(args, path, opts) {
    if (args.length) {
      return `opts=(); _${replaceSpecialChars1(this.cmd.getName())}_complete ${
        args[0].action
      }${path}`;
    }
    if (opts?.standalone) {
      return "opts=()";
    }
    return "";
  }
}
function replaceSpecialChars1(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}
class BashCompletionsCommand extends Command {
  #cmd;
  constructor(cmd3) {
    super();
    this.#cmd = cmd3;
    this.description(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      return `Generate shell completions for bash.\n\nTo enable bash completions for this program add following line to your ${
        dim1(italic1("~/.bashrc"))
      }:\n\n    ${
        dim1(italic1(`source <(${baseCmd.getPath()} completions bash)`))
      }`;
    }).action(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      Deno.stdout.writeSync(
        new TextEncoder().encode(BashCompletionsGenerator.generate(baseCmd)),
      );
    });
  }
}
class CompleteCommand extends Command {
  constructor(cmd4) {
    super();
    this.description("Get completions for given action from given command.")
      .arguments("<action:string> [command...:string]").action(
        async (_, action, commandNames) => {
          let parent;
          const completeCommand = commandNames?.reduce((cmd5, name17) => {
            parent = cmd5;
            const childCmd = cmd5.getCommand(name17, false);
            if (!childCmd) {
              throw new UnknownCompletionCommand(name17, cmd5.getCommands());
            }
            return childCmd;
          }, cmd4 || this.getMainCommand()) ?? (cmd4 || this.getMainCommand());
          const completion = completeCommand.getCompletion(action);
          const result = await completion?.complete(completeCommand, parent) ??
            [];
          if (result?.length) {
            Deno.stdout.writeSync(new TextEncoder().encode(result.join("\n")));
          }
        },
      ).reset();
  }
}
class FishCompletionsGenerator {
  static generate(cmd) {
    return new FishCompletionsGenerator(cmd).generate();
  }
  constructor(cmd5) {
    this.cmd = cmd5;
  }
  generate() {
    const path = this.cmd.getPath();
    const version = this.cmd.getVersion() ? ` v${this.cmd.getVersion()}` : "";
    return `#!/usr/bin/env fish\n# fish completion support for ${path}${version}\n\nfunction __fish_${
      replaceSpecialChars2(this.cmd.getName())
    }_using_command\n  set cmds ${
      getCommandFnNames(this.cmd).join(" ")
    }\n  set words (commandline -opc)\n  set cmd "_"\n  for word in $words\n    switch $word\n      case '-*'\n        continue\n      case '*'\n        set word (string replace -r -a '\\W' '_' $word)\n        set cmd_tmp $cmd"_$word"\n        if contains $cmd_tmp $cmds\n          set cmd $cmd_tmp\n        end\n    end\n  end\n  if [ "$cmd" = "$argv[1]" ]\n    return 0\n  end\n  return 1\nend\n\n${
      this.generateCompletions(this.cmd).trim()
    }\n`;
  }
  generateCompletions(command) {
    const parent = command.getParent();
    let result = ``;
    if (parent) {
      result += "\n" + this.complete(parent, {
        description: command.getShortDescription(),
        arguments: command.getName(),
      });
    }
    const commandArgs = command.getArguments();
    if (commandArgs.length) {
      result += "\n" + this.complete(command, {
        arguments: commandArgs.length
          ? this.getCompletionCommand(
            commandArgs[0].action + " " + getCompletionsPath(command),
          )
          : undefined,
      });
    }
    for (const option10 of command.getOptions(false)) {
      result += "\n" + this.completeOption(command, option10);
    }
    for (const subCommand of command.getCommands(false)) {
      result += this.generateCompletions(subCommand);
    }
    return result;
  }
  completeOption(command, option) {
    const shortOption = option.flags.find((flag) => flag.length === 2)?.replace(
      /^(-)+/,
      "",
    );
    const longOption = option.flags.find((flag) => flag.length > 2)?.replace(
      /^(-)+/,
      "",
    );
    return this.complete(command, {
      description: option.description,
      shortOption: shortOption,
      longOption: longOption,
      required: true,
      standalone: option.standalone,
      arguments: option.args.length
        ? this.getCompletionCommand(
          option.args[0].action + " " + getCompletionsPath(command),
        )
        : undefined,
    });
  }
  complete(command, options) {
    const cmd6 = [
      "complete",
    ];
    cmd6.push("-c", this.cmd.getName());
    cmd6.push(
      "-n",
      `'__fish_${replaceSpecialChars2(this.cmd.getName())}_using_command __${
        replaceSpecialChars2(command.getPath())
      }'`,
    );
    options.shortOption && cmd6.push("-s", options.shortOption);
    options.longOption && cmd6.push("-l", options.longOption);
    options.standalone && cmd6.push("-x");
    cmd6.push("-k");
    cmd6.push("-f");
    if (options.arguments) {
      options.required && cmd6.push("-r");
      cmd6.push("-a", options.arguments);
    }
    options.description && cmd6.push("-d", `'${options.description}'`);
    return cmd6.join(" ");
  }
  getCompletionCommand(cmd) {
    return `'(${this.cmd.getName()} completions complete ${cmd.trim()})'`;
  }
}
function getCommandFnNames(cmd6, cmds = []) {
  cmds.push(`__${replaceSpecialChars2(cmd6.getPath())}`);
  cmd6.getCommands(false).forEach((command) => {
    getCommandFnNames(command, cmds);
  });
  return cmds;
}
function getCompletionsPath(command) {
  return command.getPath().split(" ").slice(1).join(" ");
}
function replaceSpecialChars2(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}
class FishCompletionsCommand extends Command {
  #cmd;
  constructor(cmd6) {
    super();
    this.#cmd = cmd6;
    this.description(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      return `Generate shell completions for fish.\n\nTo enable fish completions for this program add following line to your ${
        dim1(italic1("~/.config/fish/config.fish"))
      }:\n\n    ${
        dim1(italic1(`source (${baseCmd.getPath()} completions fish | psub)`))
      }`;
    }).action(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      Deno.stdout.writeSync(
        new TextEncoder().encode(FishCompletionsGenerator.generate(baseCmd)),
      );
    });
  }
}
class ZshCompletionsGenerator {
  actions = new Map();
  static generate(cmd) {
    return new ZshCompletionsGenerator(cmd).generate();
  }
  constructor(cmd7) {
    this.cmd = cmd7;
  }
  generate() {
    const path = this.cmd.getPath();
    const name17 = this.cmd.getName();
    const version = this.cmd.getVersion() ? ` v${this.cmd.getVersion()}` : "";
    return `#!/usr/bin/env zsh\n# zsh completion support for ${path}${version}\n\nautoload -U is-at-least\n\n# shellcheck disable=SC2154\n(( $+functions[__${
      replaceSpecialChars3(name17)
    }_complete] )) ||\nfunction __${
      replaceSpecialChars3(name17)
    }_complete {\n  local name="$1"; shift\n  local action="$1"; shift\n  integer ret=1\n  local -a values\n  local expl lines\n  _tags "$name"\n  while _tags; do\n    if _requested "$name"; then\n      # shellcheck disable=SC2034\n      lines="$(${name17} completions complete "\${action}" "\${@}")"\n      values=("\${(ps:\\n:)lines}")\n      if (( \${#values[@]} )); then\n        while _next_label "$name" expl "$action"; do\n          compadd -S '' "\${expl[@]}" "\${values[@]}"\n        done\n      fi\n    fi\n  done\n}\n\n${
      this.generateCompletions(this.cmd).trim()
    }\n\n# _${replaceSpecialChars3(path)} "\${@}"\n\ncompdef _${
      replaceSpecialChars3(path)
    } ${path}\n\n`;
  }
  generateCompletions(command, path = "") {
    if (
      !command.hasCommands(false) && !command.hasOptions(false) &&
      !command.hasArguments()
    ) {
      return "";
    }
    path = (path ? path + " " : "") + command.getName();
    return `# shellcheck disable=SC2154\n(( $+functions[_${
      replaceSpecialChars3(path)
    }] )) ||\nfunction _${replaceSpecialChars3(path)}() {` +
      (!command.getParent() ? `\n  local state` : "") +
      this.generateCommandCompletions(command, path) +
      this.generateSubCommandCompletions(command, path) +
      this.generateArgumentCompletions(command, path) +
      this.generateActions(command) + `\n}\n\n` +
      command.getCommands(false).filter((subCommand) => subCommand !== command)
        .map((subCommand) => this.generateCompletions(subCommand, path)).join(
          "",
        );
  }
  generateCommandCompletions(command, path) {
    const commands5 = command.getCommands(false);
    let completions = commands5.map((subCommand) =>
      `'${subCommand.getName()}:${subCommand.getShortDescription()}'`
    ).join("\n      ");
    if (completions) {
      completions =
        `\n    local -a commands\n    # shellcheck disable=SC2034\n    commands=(\n      ${completions}\n    )\n    _describe 'command' commands`;
    }
    if (command.hasArguments()) {
      const completionsPath = path.split(" ").slice(1).join(" ");
      const arg3 = command.getArguments()[0];
      const action = this.addAction(arg3, completionsPath);
      if (action && command.getCompletion(arg3.action)) {
        completions += `\n    __${
          replaceSpecialChars3(this.cmd.getName())
        }_complete ${action.arg.name} ${action.arg.action} ${action.cmd}`;
      }
    }
    if (completions) {
      completions = `\n\n  function _commands() {${completions}\n  }`;
    }
    return completions;
  }
  generateSubCommandCompletions(command, path) {
    if (command.hasCommands(false)) {
      const actions = command.getCommands(false).map((command) =>
        `${command.getName()}) _${
          replaceSpecialChars3(path + " " + command.getName())
        } ;;`
      ).join("\n      ");
      return `\n\n  function _command_args() {\n    case "\${words[1]}" in\n      ${actions}\n    esac\n  }`;
    }
    return "";
  }
  generateArgumentCompletions(command, path) {
    this.actions.clear();
    const options22 = this.generateOptions(command, path);
    let argIndex = 0;
    let argsCommand = "\n\n  _arguments -w -s -S -C";
    if (command.hasOptions()) {
      argsCommand += ` \\\n    ${options22.join(" \\\n    ")}`;
    }
    if (
      command.hasCommands(false) || command.getArguments().filter((arg3) =>
        command.getCompletion(arg3.action)
      ).length
    ) {
      argsCommand += ` \\\n    '${++argIndex}: :_commands'`;
    }
    if (command.hasArguments() || command.hasCommands(false)) {
      const args3 = [];
      for (const arg3 of command.getArguments().slice(1)) {
        const completionsPath = path.split(" ").slice(1).join(" ");
        const action = this.addAction(arg3, completionsPath);
        args3.push(
          `${++argIndex}${arg3.optionalValue ? "::" : ":"}${action.name}`,
        );
      }
      argsCommand += args3.map((arg4) => `\\\n    '${arg4}'`).join("");
      if (command.hasCommands(false)) {
        argsCommand += ` \\\n    '*:: :->command_args'`;
      }
    }
    return argsCommand;
  }
  generateOptions(command, path) {
    const options22 = [];
    const cmdArgs = path.split(" ");
    const _baseName = cmdArgs.shift();
    const completionsPath = cmdArgs.join(" ");
    const excludedFlags = command.getOptions(false).map((option10) =>
      option10.standalone ? option10.flags : false
    ).flat().filter((flag) => typeof flag === "string");
    for (const option10 of command.getOptions(false)) {
      options22.push(
        this.generateOption(option10, completionsPath, excludedFlags),
      );
    }
    return options22;
  }
  generateOption(option, completionsPath, excludedOptions) {
    const flags = option.flags;
    let excludedFlags = option.conflicts?.length
      ? [
        ...excludedOptions,
        ...option.conflicts.map((opt) => "--" + opt.replace(/^--/, "")),
      ]
      : excludedOptions;
    excludedFlags = option.collect ? excludedFlags : [
      ...excludedFlags,
      ...flags,
    ];
    let args3 = "";
    for (const arg3 of option.args) {
      const action = this.addAction(arg3, completionsPath);
      if (arg3.variadic) {
        args3 += `${
          arg3.optionalValue ? "::" : ":"
        }${arg3.name}:->${action.name}`;
      } else {
        args3 += `${
          arg3.optionalValue ? "::" : ":"
        }${arg3.name}:->${action.name}`;
      }
    }
    let description = option.description.trim().split("\n").shift();
    description = description.replace(/\[/g, "\\[").replace(/]/g, "\\]")
      .replace(/"/g, '\\"').replace(/'/g, "'\"'\"'");
    const collect = option.collect ? "*" : "";
    if (option.standalone) {
      return `'(- *)'{${collect}${flags}}'[${description}]${args3}'`;
    } else {
      const excluded2 = excludedFlags.length
        ? `'(${excludedFlags.join(" ")})'`
        : "";
      if (collect || flags.length > 1) {
        return `${excluded2}{${collect}${flags}}'[${description}]${args3}'`;
      } else {
        return `${excluded2}${flags}'[${description}]${args3}'`;
      }
    }
  }
  addAction(arg, cmd) {
    const action = `${arg.name}-${arg.action}`;
    if (!this.actions.has(action)) {
      this.actions.set(action, {
        arg: arg,
        label: `${arg.name}: ${arg.action}`,
        name: action,
        cmd,
      });
    }
    return this.actions.get(action);
  }
  generateActions(command) {
    let actions = [];
    if (this.actions.size) {
      actions = Array.from(this.actions).map(([name17, action]) =>
        `${name17}) __${
          replaceSpecialChars3(this.cmd.getName())
        }_complete ${action.arg.name} ${action.arg.action} ${action.cmd} ;;`
      );
    }
    if (command.hasCommands(false)) {
      actions.unshift(`command_args) _command_args ;;`);
    }
    if (actions.length) {
      return `\n\n  case "$state" in\n    ${actions.join("\n    ")}\n  esac`;
    }
    return "";
  }
}
function replaceSpecialChars3(str) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}
class ZshCompletionsCommand extends Command {
  #cmd;
  constructor(cmd8) {
    super();
    this.#cmd = cmd8;
    this.description(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      return `Generate shell completions for zsh.\n\nTo enable zsh completions for this program add following line to your ${
        dim1(italic1("~/.zshrc"))
      }:\n\n    ${
        dim1(italic1(`source <(${baseCmd.getPath()} completions zsh)`))
      }`;
    }).action(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      Deno.stdout.writeSync(
        new TextEncoder().encode(ZshCompletionsGenerator.generate(baseCmd)),
      );
    });
  }
}
class CompletionsCommand extends Command {
  #cmd;
  constructor(cmd9) {
    super();
    this.#cmd = cmd9;
    this.description(() => {
      const baseCmd = this.#cmd || this.getMainCommand();
      return `Generate shell completions.\n\nTo enable shell completions for this program add following line to your ${
        dim1(italic1("~/.bashrc"))
      } or similar:\n\n    ${
        dim1(italic1(`source <(${baseCmd.getPath()} completions [shell])`))
      }\n\n    For mor information run ${
        dim1(italic1(`${baseCmd.getPath()} completions [shell] --help`))
      }\n`;
    }).action(() => this.showHelp()).command(
      "bash",
      new BashCompletionsCommand(this.#cmd),
    ).command("fish", new FishCompletionsCommand(this.#cmd)).command(
      "zsh",
      new ZshCompletionsCommand(this.#cmd),
    ).command("complete", new CompleteCommand(this.#cmd).hidden()).reset();
  }
}
class CommandType extends StringType {
  complete(cmd, parent) {
    return parent?.getCommands(false).map((cmd10) => cmd10.getName()) || [];
  }
}
class HelpCommand extends Command {
  constructor(cmd10) {
    super();
    this.type("command", new CommandType()).arguments("[command:command]")
      .description("Show this help or the help of a sub-command.").action(
        (_, name17) => {
          if (!cmd10) {
            cmd10 = name17
              ? this.getGlobalParent()?.getBaseCommand(name17)
              : this.getGlobalParent();
          }
          if (!cmd10) {
            const cmds = this.getGlobalParent()?.getCommands();
            throw new UnknownCommand(name17 ?? "", cmds ?? [], [
              this.getName(),
              ...this.getAliases(),
            ]);
          }
          cmd10.showHelp();
          Deno.exit(0);
        },
      );
  }
}
class ActionListType extends StringType {
  constructor(cmd11) {
    super();
    this.cmd = cmd11;
  }
  complete() {
    return this.cmd.getCompletions().map((type2) => type2.name).filter((
      value3,
      index,
      self,
    ) => self.indexOf(value3) === index);
  }
}
class ChildCommandType extends StringType {
  #cmd;
  constructor(cmd12) {
    super();
    this.#cmd = cmd12;
  }
  complete(cmd) {
    return (this.#cmd ?? cmd)?.getCommands(false).map((cmd13) =>
      cmd13.getName()
    ) || [];
  }
}
class Helper1 {
  convert(input, output, format, options) {
    const encoder = mod.ffmpeg(input);
    encoder.audioBitrate("192k").videoBitrate("1M").addEventListener(
      "progress",
      this.handleProgress,
    ).width(options ? options?.width : 480).height(
      options ? options?.height : 380,
    ).output("./" + output + "." + format).encode();
  }
  handleProgress(event) {
    if (!event.frame && !event.outTimeMs && !event.fps && !event.speed) {
      console.log(mod1.green("[ffmpeg]: ") + `progress ${event.progress}`);
    }
    if (!event.fps && !event.frame) {
      console.log(
        mod1.green("[ffmpeg]: ") +
          `time: ${event.outTimeMs}ms speed: ${event.speed}x`,
      );
    }
    if (event.done) {
      console.log(`✨Done✨ in ${event.outTimeMs} ms`);
    } else {
      console.log(
        mod1.green("[ffmpeg]: ") +
          `frame: ${event.frame} fps: ${event.fps} time: ${event.outTimeMs}ms speed: ${event.speed}x`,
      );
    }
  }
  validateOutput(output) {
    const splitOutput = output.split("");
    const splicedOutput = splitOutput.splice(2, output.length - 2);
    if (splicedOutput[0] === ".") {
      throw new Error("Invalid path");
    }
    if (splicedOutput.includes(".")) {
      const error2 = new Error(
        `unexpected character '.' output file name must not contain a '.' or extension like '.mp4', '.gif'`,
      );
      throw error2;
    }
    if (splitOutput[0] === "/") {
      const error2 = new Error(
        `unexpected character '/' output file name must not contain a '/' or extension like '.mp4', '.gif'`,
      );
      throw error2;
    }
  }
  checkForInputAndOutput(input, output) {
    if (!input) {
      const error2 = new Error("input file is required");
      throw error2;
    }
    if (!output) {
      const error2 = new Error("output file is required");
      throw error2;
    }
  }
}
export { Helper1 as Helper };
