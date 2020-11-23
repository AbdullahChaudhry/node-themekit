#!/usr/bin/env node
const parsedArgv = require('minimist')(process.argv.slice(2));

const install = require('./install');
const update = require('./update');
const logger = require('./logger')();
const runExecutable = require('./run-executable');
const config = require('./config');

if (parsedArgv._[0] === 'install') {
  install(parsedArgv)
    .then(() => {
      if (config.update) {
        update(parsedArgv, config.update.version)
      }
    })
} else {
  runExecutable(process.argv.slice(2), process.cwd(), parsedArgv.logLevel)
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
}
