#!/usr/bin/env -S deno run --allow-net --allow-env --allow-run

import { commandTs } from "./deps/mod.ts";
import { gif } from "./mod.ts";
import { Options } from "./types/types.ts";

await cli();
async function cli() {
	await new commandTs.Command()
		.name("gif")
		.version("0.2.8")
		.description("A command line tool for creating gifs")
		.option("-w, --width <width:number>", "default 480")
		.option("-l, --height <height:number>", "height 380")
		.arguments("[inputfile:string] [outputfile: string]")
		.action(createGif())
		.parse(Deno.args);

	// deno-lint-ignore no-explicit-any
	function createGif(): commandTs.IAction<any, any> {
		return (options: Options, inputfile: string, outputfile: string) => {
			if (Deno.args.length < 2) {
				console.log(`Expected 2 arguments but got ${Deno.args.length}
      type '--help' to output help`);
			} else {
				const opts = {
					width: options.width,
					height: options.height,
				};
				gif(inputfile, outputfile, opts);
			}
		};
	}
}
