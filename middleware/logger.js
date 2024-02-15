const winston = require('winston');

// Configure the Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    // Add additional transports as needed (e.g., file transport for storing logs)
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
});

module.exports = logger;
