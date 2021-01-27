#!/usr/bin/env -S deno run --allow-net --allow-env --allow-run

import { commandTs } from "./deps/mod.ts";
import { gif } from "./mod.ts";

interface Options {
  width: number;
  height: number;
}

await new commandTs.Command()
  .name("gif [inputfile] [outputfile]")
  .version("0.2.2")
  .description("A command line tool for creating gifs")
  .option("-w, --width <width:number>", "max width [500]")
  .option("-l, --height <height:number>", "max height [none]")
  .arguments("[inputfile:string] [outputfile: string]")
  .action((options: Options, inputfile: string, outputfile: string) => {
    const opts = {
      width: options.width,
      height: options.height,
    };
    gif(inputfile, outputfile, opts);
  })
  .parse(Deno.args);
