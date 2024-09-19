const winston = require('winston');
const { createLogger, format, transports } = require('winston');

const printFormat = format.printf(
  ({ level, message, timestamp }) => `[${timestamp}] ${level}:   ${message}`
);
const timestampFormat = format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' });

winston.addColors({
  error: 'bold red',
  warn: 'bold yellow',
  info: 'bold green',
  http: 'bold blue',
  debug: 'bold magenta',
});

const consoleLogOptions = {
  level: 'debug',
  format: format.combine(
    format.colorize({ all: true }),
    timestampFormat,
    printFormat
  ),
};

const logger = createLogger({
  level: 'debug',
  format: format.combine(timestampFormat, format.json()),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console(consoleLogOptions),
  ],
});

module.exports = logger;
