const express = require("express")

//Controllers
const { createConsole, getAllConsoles, updateConsole, deleteConsole, assignGameToConsole} = require("../controllers/consoles.controller")

//Middleware
const { consoleExist } = require("../middlewares/consoleExist.middleware")
const { protectSession } = require("../middlewares/auth.middleware")


const consoleRouter = express.Router()

consoleRouter.post("/",protectSession, createConsole)
consoleRouter.get("/", getAllConsoles)
consoleRouter.post("/assign-toconsole",protectSession, assignGameToConsole)
consoleRouter.patch("/:id",protectSession, consoleExist, updateConsole)
consoleRouter.delete("/:id",protectSession, consoleExist, deleteConsole)

module.exports = { consoleRouter }

