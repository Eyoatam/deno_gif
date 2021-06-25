<h1 align="center">Gif.ts</h1>

<p align="center">
<img src="https://github.com/Eyoatam/Gif.ts/workflows/ci/badge.svg">
<img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fdeno_gif%2Fmod.ts">
<img src="https://img.shields.io/badge/license-MIT-blue.svg">
<img src="https://img.shields.io/badge/deno-^1.11.0-informational?logo=deno">
<a href="https://doc.deno.land/https/deno.land/x/deno_gif/mod.ts">
  <img src="https://doc.deno.land/badge.svg">
</a>
</p>

> convert your videos to `.gif`, `.mp3`, `.mp4`, `.webm` and `.avi`

## Installation

```bash
deno install  --allow-read --allow-write --allow-run -f -n gif https://deno.land/x/deno_gif@1.4/cli.ts
```

This module Requires `ffmpeg`:

```bash
brew install ffmpeg
```

## Options

| name     | description                      |
| -------- | -------------------------------- |
| `width`  | controls the width of the video  |
| `height` | controls the height of the video |

## Methods

| name   | description                           |
| ------ | ------------------------------------- |
| `gif`  | converts videos of any format to gifs |
| `mp4`  | converts videos of any format to mp4  |
| `mp3`  | converts videos of any format to mp3  |
| `avi`  | converts videos of any format to avi  |
| `webm` | converts videos of any format to webm |

## Example

> Example of converting video to gif with options

```ts
import { gif } from "https://deno.land/x/deno_gif@<version>/mod.ts";

const options = {
  width: 480,
  height: 380,
};

gif(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
  options,
);
```

> and without options

```ts
import { gif } from "https://deno.land/x/deno_gif@<version>/mod.ts";

gif(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
);
```

> or using the cli

```bash
gif -i https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4 -o output
```

> Example of converting video to mp3

```ts
import { mp3 } from "https://deno.land/x/deno_gif@<version>/mod.ts";

mp3(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
);
```

> or using the cli

```bash
gif --mp3 -i https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4 -o output
```

> Example of converting video to mp4 with options

```ts
import { mp4 } from "https://deno.land/x/deno_gif@<version>/mod.ts";

const options = {
  width: 480,
  height: 350,
};

mp4(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
  options,
);
```

> and with out options

```ts
import { mp4 } from "https://deno.land/x/deno_gif@<version>/mod.ts";

mp4(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
);
```

> or using the cli

```bash
gif --mp4 -i https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4 -o output
```

> Example of converting video to avi with options

```ts
import { avi } from "https://deno.land/x/deno_gif@<version>/mod.ts";

const options = {
  width: 480,
  height: 350,
};

avi(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
  options,
);
```

> and with out options

```ts
import { avi } from "https://deno.land/x/deno_gif@<version>/mod.ts";

avi(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
);
```

> or using the cli

```bash
gif --avi -i https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4 -o output
```

> Example of converting video to webm with options

```ts
import { webm } from "https://deno.land/x/deno_gif@<version>/mod.ts";

const options = {
  width: 480,
  height: 350,
};

webm(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
  options,
);
```

> and with out options

```ts
import { webm } from "https://deno.land/x/deno_gif@<version>/mod.ts";

webm(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
);
```

> or using the cli

```bash
gif --webm -i https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4 -o output
```

> Example of converting video to mov with options

```ts
import { mov } from "https://deno.land/x/deno_gif@<version>/mod.ts";

const options = {
  width: 480,
  height: 350,
};

mov(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
  options,
);
```

> and with out options

```ts
import { mov } from "https://deno.land/x/deno_gif@<version>/mod.ts";

mov(
  "https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4",
  "output",
);
```

> or using the cli

```bash
gif --mov -i https://github.com/Eyoatam/Gif.ts/tree/master/example/testdata/video.mp4 -o output
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feat/new-feature`
3. Commit your changes: `git commit -am 'feat(newFeature): add new features'`
4. Push to the branch: `git push origin feat/new-feature`
5. Submit a pull request

Give your pr a descriptive title

Examples of good title:

- fix(cli): fix cli video to gif converter
- feat(utils): add more utils

For further information you can read the
[Contribiting guidelines](https://github.com/Eyoatam/Gif.ts/blob/master/CONTRIBUTING.md)

## Show Your Support

Give a 🌟 if you like this project!

# License

[MIT](https://github.com/Eyoatam/gif.ts/blob/master/LICENSE)
