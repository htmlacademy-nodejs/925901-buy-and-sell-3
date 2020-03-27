'use strict';

const {Cli} = require(`./cli`);
const {
  USER_ARGV_INDEX,
  ExitCode,
} = require(`../constants`);

const DEFAULT_COMMAND = `--help`;

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand, ...commandArgs] = userArguments;

if (userArguments.length === 0) {
  runDefaultCommand();
}

if (!Cli[userCommand]) {
  runDefaultCommand();
}

Cli[userCommand].run(commandArgs);

function runDefaultCommand() {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}
