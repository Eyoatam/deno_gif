# (WIP) gif.ts

![CI](https://github.com/Eyoatam/gif.ts/workflows/ci/badge.svg)
![](https://img.shields.io/github/v/release/Eyoatam/gif.ts?logo=github)
![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/deno-^1.4.0-informational?logo=deno")
> Note: :warning: This project is early WIP! currently the focus is to make it stable and feature complete.

Turn videos into gifs.

## Installation

```bash
  deno install --allow-read --allow-write --allow-run -f -n gif https://deno.land/x/deno_gif@0.2/cli.ts
```

This module Requires `ffmpeg`:

```
brew install ffmpeg
```

## Example

```ts
import { gif } from "https://deno.land/x/deno_gif@0.2/mod.ts";

const opts = {
	width: 480,
	height: 380,
};

gif("https://www.w3schools.com/html/mov_bbb.mp4", "./out.gif", opts);
```

or using the cli

```bash
gif -w 480 -t 350 https://www.w3schools.com/html/mov_bbb.mp4 output.mp4
```

## Options

- `width` type number
- `height` type number

## Credits

This project is based on: 

- Benjamin Fischer's [deno_fast_forward](https://github.com/c4spar/deno-fast-forward) which is a wrapper for the [FFmpeg](https://github.com/ffmpeg/ffmpeg) library which is used for actually encoding into gifs

# License

[MIT](https://github.com/Eyoatam/gif.ts/blob/master/LICENSE)
