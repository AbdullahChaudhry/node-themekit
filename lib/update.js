#!/usr/bin/env node
const runExecutable = require('./run-executable');
const spinner = require('simple-spinner');

const config = require('./config');

/**
 * Updates the Theme Kit executable to a specific version after install.
 * Called if there is an upgrade key in the config.
 * @param {string} logLevel   Log level
 * @param {string} version   Version
 */
async function update(logLevel) {
  const logger = require('./logger')(logLevel)
  
  logger.silly('Theme Kit update starting');
  spinner.start();

  const { destination, binName } = config;
  const pathToExecutable = `${destination}/${binName}`;

  const version = config.update.version;

  try {
    await runExecutable(['update', `--version=v${version}`], process.cwd(), logLevel)
    spinner.stop();
    logger.info(`Theme Kit path: ${pathToExecutable}`);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = update
