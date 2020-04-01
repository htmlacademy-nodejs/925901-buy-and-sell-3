'use strict';

const {CLI} = require(`./CLI`);
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

if (!CLI[userCommand]) {
  runDefaultCommand();
}

CLI[userCommand].run(commandArgs);

function runDefaultCommand() {
  CLI[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}
