const express = require("express")

//Controllers
const { createGame, getAllGames, updateGame, deleteGame, reviewGame } = require("../controllers/games.controllers")

//Middleware
const { gameExist } = require("../middlewares/gameExist.middleware")
const { protectSession } = require("../middlewares/auth.middleware")

const gamesRouter = express.Router()

gamesRouter.post("/",protectSession, createGame)
gamesRouter.get("/", getAllGames)
gamesRouter.patch("/:id", protectSession, gameExist, updateGame)
gamesRouter.delete("/:id",protectSession, gameExist, deleteGame)
gamesRouter.post("/reviews/:gameId",protectSession, gameExist, reviewGame)

module.exports = { gamesRouter }