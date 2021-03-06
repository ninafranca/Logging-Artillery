import express from "express"
import compression from "compression"
import core from "os"
//import cluster from "cluster"
import createLogger from "./utils.js"

const app = express()
const PORT = parseInt(process.argv[2]) || 8080
const server = app.listen(PORT, () => {console.log(`Listening on port ${PORT}`);})
const logger = createLogger(process.env.NODE_ENV)

//APP.USE
app.use(compression())

//APP.GET
app.get("/", (req, res) => {
    res.send("Welcome")
})
app.get("/info", (req, res) => {
    logger.info("Info")
    const info = {
        status: "success",
        payload: {
            args: process.argv,
            os: process.platform,
            nodeVersion: process.version,
            memoryUsage: process.memoryUsage(),
            execPath: process.execPath,
            processId: process.pid,
            projectFolder: process.cwd(),
            cores: core.cpus().length
        }
    }
    //console.log(info);
    res.send(info)
})
app.get("/error", (req, res) => {
    logger.error("An error has been detected")
    res.send({status: "error", message: "There has been an error"})
})

//INVALID ENDPOINTS
app.use((req, res) => {
    logger.warn(`${req.method} method not available in path ${req.path}`)
    res.status(404).send({error: "Invalid endpoint"});
})
