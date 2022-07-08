const express = require("express")

//Controllers
const { createGame, getAllGames, updateGame, deleteGame, reviewGame } = require("../controllers/games.controllers")

//Middleware
const { gameExist } = require("../middlewares/gameExist.middleware")

const gamesRouter = express.Router()

gamesRouter.post("/", createGame)
gamesRouter.get("/", getAllGames)
gamesRouter.patch("/:id", gameExist, updateGame)
gamesRouter.delete("/:id", gameExist, deleteGame)
gamesRouter.post("/reviews/:gameId", gameExist, reviewGame)

module.exports = { gamesRouter }