const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

//Models
const { Users } = require("../models/users.model")

//Utils
const { catchAsync } = require("../utils/catchAsync.util")
const { AppError } = require("../utils/appError.util")

dotenv.config({ path: "./config.env" })

const createUser = catchAsync( async(req, res, next) => {
    const { name, email, password} = req.body

    //Hash password
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = await Users.create({
        name,
        email,
        password: hashPassword
    })
    newUser.password = undefined //removing from the response

    res.status(201).json({
        status: "sucess",
        newUser
    })

})

const login = catchAsync( async(req, res, next) => {
    const { email, password } = req.body
    
    //Validate credential
    const user = await Users.findOne({ where: { email, status : "active" } })
    if(!user){
       return next(new AppError("Invalid credentials", 400)) 
    }

    //Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return next(new AppError("Invalid credentials", 400))
    }

    //JWT
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h"
    })
    

    res.status(200).json({
        status: "sucess",
        message: "Correct credentials",
        token
    })
})

const updateUser = catchAsync( async(req, res, next) => {
    const { user } = req
    const { username, email } = req.body

    await user.update({ name: username, email})

    res.status(201).json({
        status: "sucess",
        user
    })
    
})

const deleteUser = catchAsync( async(req, res, next) => {
    const { user } = req
    await user.update({ status: "deleted"})

    res.status(200).json({
        status: "sucess",
        message: "User deleted",
        user
    })
})

const getAllUsers = catchAsync( async(req, res, next) => {
    
    const users = await Users.findAll({
        attributes: ["id", "name", "email", "status"],
        where: { status: "active"}
    })

    res.status(200).json({
        status: "sucess",
        users
    })
})

module.exports = { createUser, login, getAllUsers, updateUser, deleteUser }
