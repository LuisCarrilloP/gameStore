const express = require("express")

//Routers
const { userRouter } = require("./routes/users.routes")
const { gamesRouter } = require("./routes/games.routes")
const { consoleRouter } = require("./routes/consoles.routes")


//GlobalError
const { globalErrorHandler } = require("./controllers/globalErrorHandler")

//Utils
const { AppError } = require("./utils/appError.util")


//Init app
const app = express()

//Allow json
app.use(express.json())

//Endpoints
app.use("/api/v1/users", userRouter)
app.use("/api/v1/games", gamesRouter)
app.use("/api/v1/consoles", consoleRouter)

app.all("*", (req, res, next) => {
    next(new AppError(`${req.method} ${req.originalUrl} not found in this server`, 404))
})

//Global error handler
app.use(globalErrorHandler)

module.exports = { app }