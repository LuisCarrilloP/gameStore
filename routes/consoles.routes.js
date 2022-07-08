const express = require("express")

//Controllers
const { createConsole, getAllConsoles, updateConsole, deleteConsole, assignGameToConsole} = require("../controllers/consoles.controller")

//Middleware
const { consoleExist } = require("../middlewares/consoleExist.middleware")


const consoleRouter = express.Router()

consoleRouter.post("/", createConsole)
consoleRouter.get("/", getAllConsoles)
consoleRouter.post("/assign-toconsole", assignGameToConsole)
consoleRouter.patch("/:id", consoleExist, updateConsole)
consoleRouter.delete("/:id", consoleExist, deleteConsole)

module.exports = { consoleRouter }

