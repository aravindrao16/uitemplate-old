const pino = require("pino");

const logLevel = process.env.VERBOSITY ?? "info";
const pinoConfig = {
  level: logLevel,
};

const logger = pino(pinoConfig);

const cleanUp = (signal) => {
  // Any server clean up processes should be implemented here
  logger.error(`Signal "${signal}" received. Shuting down.`);
  process.exit(0);
};

// Overriding `uncaughtException` is not advised
// https://nodejs.org/api/process.html#process_event_uncaughtexception
process
  .on("SIGTERM", cleanUp)
  .on("SIGINT", cleanUp)
  .on("unhandledRejection", (reason, promise) => {
    console.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  });
