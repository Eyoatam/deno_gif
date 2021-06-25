#!/usr/bin/env -S deno run --allow-net --allow-env --allow-run

import { Command } from "./deps.ts";
import { avi, gif, mov, mp3, mp4, webm } from "./mod.ts";

export interface CLiOptions {
  input: string;
  output: string;
}

const program = new Command();

if (Deno.args.length < 1) {
  console.log(`No arguments provided!
    Usage: gif -i [inputfile] -o [outputfile] run again with --help for more help`);
  Deno.exit();
}

program
  .name("gif")
  .version("1.0.0")
  .description(
    "A command line tool for converting videos to other file formats like gifs, avi, mp4 and webm",
  )
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
  .option("--mov", "convert to mov", {
    action: createMov(),
  })
  .arguments("[inputfile:string] [outputfile: string]")
  .action(createGif())
  .parse(Deno.args);

function createGif() {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    gif(inputfile, outputfile);
  };
}

function createMp3() {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    mp3(inputfile, outputfile);
  };
}

function createWebm() {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    webm(inputfile, outputfile);
  };
}
function createMp4() {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    mp4(inputfile, outputfile);
  };
}

function createAvi() {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    avi(inputfile, outputfile);
  };
}

function createMov() {
  return (options: CLiOptions) => {
    const inputfile = options.input;
    const outputfile = options.output;
    mov(inputfile, outputfile);
  };
}
