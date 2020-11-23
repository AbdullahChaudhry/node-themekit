const runExecutable = require('./run-executable');
const spinner = require('simple-spinner');

const config = require('./config');

/**
 * Updates the Theme Kit executable to a specific version after install.
 * Called if there is an upgrade key in the config.
 * @param {string} logLevel   Log level
 * @param {string} version   Version
 */
async function upgrade(logLevel, version) {
  const logger = require('./logger')(logLevel)
  
  logger.silly('Theme Kit update starting');
  spinner.start();

  const { destination, binName } = config;
  const pathToExecutable = `${destination}/${binName}`;

  try {
    await runExecutable(['update', `--version=v${version}`], process.cwd(), logLevel)
    spinner.stop();
    logger.info(`Theme Kit path: ${pathToExecutable}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

module.exports = upgrade
