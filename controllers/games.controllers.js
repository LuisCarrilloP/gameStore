//Models
const { Games } = require("../models/games.model")
const { Reviews } = require("../models/reviews.model")

//Utils
const { catchAsync } = require("../utils/catchAsync.util")
const { AppError } = require("../utils/appError.util")

const createGame = catchAsync(async(req, res, next) => {
    const { title, genre } = req.body

    const newGame = await Games.create({ title, genre })

    res.status(201).json({
        status: "sucess",
        newGame
    })
})

const getAllGames = catchAsync(async(req, res, next) => {
    const data = await Games.findAll({
        attributes: ["id", "title", "genre", "status"],
        include: [{ model: Reviews, attributes: ["id", "comment"] }]
    })

    res.status(200).json({
        status: "sucess",
        data
    })
})

const updateGame = catchAsync(async(req, res, next) => {
    const { game } = req
    
    const { title } = req.body

    await game.update({ title })

    res.status(201).json({
        status: "sucess",
        game
    })
})

const deleteGame = catchAsync(async(req, res, next) => {
    const { game } = req

    await game.update({ status: "deleted" })

    res.status(201).json({
        status: "sucess",
        message: "Game deleted(disabled)",
        game
    })
})

const reviewGame = catchAsync(async(req, res, next) => {
    const { comment } = req.body
    const { sessionUser, game } = req
    
    const newReview = await Reviews.create({
        userId: sessionUser.id,
        gameId: game.id,
        comment
    })

    res.status(200).json({
        status: "sucess",
        newReview
    })
})


module.exports = { createGame, getAllGames, updateGame, deleteGame, reviewGame }