# (WIP) Gif.ts

![CI](https://github.com/Eyoatam/gif.ts/workflows/ci/badge.svg)
![](https://img.shields.io/github/v/release/Eyoatam/gif.ts?logo=github)
![](https://img.shields.io/badge/license-MIT-blue.svg)
![](https://img.shields.io/badge/deno-^1.4.0-informational?logo=deno")
![](https://img.shields.io/github/stars/eyoatam/Gif.ts?style=social)

> convert your videos to gifs

## Installation

```bash
deno install --allow-read --allow-write --allow-run -f -n gif https://deno.land/x/deno_gif@0.3.0/cli.ts
```

This module Requires `ffmpeg`:

```
brew install ffmpeg
```

## Example

> Example with options

```ts
import { gif } from "https://deno.land/x/deno_gif@0.3.3/mod.ts";

const options = {
  width: 480,
  height: 380,
};

gif("https://www.w3schools.com/html/mov_bbb.mp4", "output", options);
```

> Example without options

```ts
import { gif } from "https://deno.land/x/deno_gif@0.3.3/mod.ts";

gif("https://www.w3schools.com/html/mov_bbb.mp4", "output");
```

or using the cli

```bash
gif -w 480 -t 350 https://www.w3schools.com/html/mov_bbb.mp4 output
```

## Options

- `width` type number
- `height` type number

## Show Your Support

Give a 🌟 if you like this project!

# License

[MIT](https://github.com/Eyoatam/gif.ts/blob/master/LICENSE)
