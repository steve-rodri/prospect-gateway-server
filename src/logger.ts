import expressWinston from "express-winston"
import winston from "winston"

const loggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		// winston.format.colorize(),
		winston.format.prettyPrint()
	),
	meta: true,
	colorize: false,
	expressFormat: true
}

// normal logger instance
const logger = winston.createLogger(loggerOptions)

// http logger middleware
export const loggerMiddleware = expressWinston.logger(loggerOptions)

// use always instead of console.log
export default logger
