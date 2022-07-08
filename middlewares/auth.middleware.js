const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

//Models
const { Users } = require("../models/users.model")

//Utils
const { catchAsync } = require("../utils/catchAsync.util")
const { AppError } = require("../utils/appError.util")

dotenv.config({ path: "./config.env"})

const protectSession = catchAsync(async(req, res, next) => {
    let token

    //Extract token from headers
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //Bearer token
        //[Bearer, token]
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
        next(new AppError("Invalid session", 403))
    }
    /* console.log(token); */

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    /* console.log(decoded); */
    //ASK JWT (library), if the token is still valid

    //Chek in db that user still exists
    const user = await Users.findOne({
        where: { id: decoded.id, status: "active"}
    })

    if(!user){
        return next(new AppError("The owner of this token doesen exist anymore", 403))
    }

    //Grant acess
    req.sessionUser = user
    next()
})


//Get the session users id
//validate that the user that is being modificated is the same as the session user
//If the id's dont match return error 403
//Aplly middleware pnly in patch and delete
const protectUserAccount = (req, res, next) => {
    const { sessionUser, user } = req
    /* const { id } = req.params */

    if(sessionUser.id !== user.id){
        return next(new AppError("You do not own this account", 403))
    }

    next()
}

module.exports = { protectSession, protectUserAccount }