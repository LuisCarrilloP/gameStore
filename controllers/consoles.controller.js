//Models
const { Consoles } = require("../models/consoles.model")
const { Games } = require("../models/games.model")
const { GamesInConsoles } = require("../models/gamesInConsoles.model")

//Utils
const { AppError } = require("../utils/appError.util")
const { catchAsync } = require("../utils/catchAsync.util")

const createConsole = catchAsync(async(req, res, next) => {
    const { name, company } = req.body

    const newConsole = await Consoles.create({
        name,
        company
    })

    res.status(201).json({
        status: "sucess",
        newConsole
    })
})

const getAllConsoles = catchAsync(async(req, res, next) => {
    const consoles = await Consoles.findAll({
        attributes: ['id', 'name', 'company', 'status'],
        include: [{ model: Games, attributes: ['title', 'genre', 'status'] }],
        where: { status: 'active' },
    });


    res.status(200).json({
        status: "sucess",
        consoles
    })
})

const updateConsole = catchAsync(async(req, res, next) => {
    const { name } = req.body
    const { console } = req

    await console.update({ name })

    res.status(204).json({
        status: "sucess", 
        console
    })
})

const deleteConsole = catchAsync(async(req, res, next) => {
    const { console } = req

    await console.update({ status: "deleted" })

    res.status(204).json({
        status: "sucess",
        message: "Console deleted",
        console
    })
})

const assignGameToConsole = catchAsync(async(req, res, next) => {
    const { gameId, consoleId } = req.body

    const newGameInConsole = await GamesInConsoles.create({
        gameId, 
        consoleId
    })

    res.status(201).json({
        status: "sucess",
        newGameInConsole
    })
})

module.exports = { createConsole, getAllConsoles, updateConsole, deleteConsole, assignGameToConsole }
