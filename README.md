# gif.ts

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

## Options

- `width` max width [500]
- `height` max height [none]

# License

[MIT](https://github.com/Eyoatam/gif.ts/blob/master/LICENSE)
