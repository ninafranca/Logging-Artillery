import winston from "winston"
const {combine, timestamp, json} = winston.format

const createLogger = (env) => {
    // if (env === "PROD") {
        return winston.createLogger({
            format: combine(
                timestamp(),
                json()
            ),
            transports: [
                new winston.transports.File({filename: "./logs/warn.log", level: "warn"}),
                new winston.transports.File({filename: "./logs/errors.log", level: "error"})
            ]
        })
    // } else {
    //     return winston.createLogger({
    //         format: combine(
    //             timestamp(),
    //             json()
    //         ),
    //         transports: [
    //             new winston.transports.Console({level: "all"})
    //         ]
    //     })
    // }
}

export default createLogger