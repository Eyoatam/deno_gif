#!/usr/bin/env -S deno run --allow-net --allow-env --allow-run

import { commandTs } from "./deps/mod.ts";
import { avi, gif, mp3, mp4, webm } from "./mod.ts";
import { CLiOptions } from "./types/types.ts";

const program = new commandTs.Command();

program
  .name("gif")
  .version("0.2.8")
  .description("A command line tool for creating gifs")
  .option("-i, --input <input:string>", "input file")
  .option("-o, --output <output:string>", "output file")
  .option("-a, --mp3", "convert to mp3.", {
    action: createMp3(),
  })
  .option("-m --mp4", "convert to webm", {
    action: createMp4(),
  })
  .option("-a.v --avi", "convert to webm", {
    action: createAvi(),
  })
  .option("-w --webm", "convert to webm", {
    action: createWebm(),
  })
  .arguments("[inputfile:string] [outputfile: string]")
  .action(createGif())
  .parse(Deno.args);

// deno-lint-ignore no-explicit-any
function createGif(): commandTs.IAction<any, any> {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    gif(inputfile, outputfile);
  };
}

// deno-lint-ignore no-explicit-any
function createMp3(): commandTs.IAction<any, any> {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    mp3(inputfile, outputfile);
  };
}

// deno-lint-ignore no-explicit-any
function createWebm(): commandTs.IAction<any, any> {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    webm(inputfile, outputfile);
  };
}
// deno-lint-ignore no-explicit-any
function createMp4(): commandTs.IAction<any, any> {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    mp4(inputfile, outputfile);
  };
}

// deno-lint-ignore no-explicit-any
function createAvi(): commandTs.IAction<any, any> {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    avi(inputfile, outputfile);
  };
}
