'use strict';

const chalk = require(`chalk`);

const TEXT_MESSAGE = `
  This utility runs http server and generates mock data for API.

  Guide:

    server <command>

    Commands:

    --version:              prints app version
    --help:                 shows this message
    --generate <count>      generates mock data
`;

module.exports = {
  name: `--help`,
  run() {
    console.log(chalk.cyan(TEXT_MESSAGE));
  },
};
