'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);

const CLI = {
  [version.name]: version,
  [help.name]: help,
  [generate.name]: generate,
};

module.exports = {
  CLI,
};
