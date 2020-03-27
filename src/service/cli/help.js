'use strict';

const chalk = require(`chalk`);

const textMessage = `
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
    console.log(chalk.cyan(textMessage));
  },
};
