const { body, validationResult } = require("express-validator")

//Utils
const { AppError } = require("../utils/appError.util")

const checkResult = (req, res, next) => {
    const errors = validationResult(req)
    /* console.log(errors); */
    if(!errors.isEmpty()){
        const errorMsgs = errors.array().map(err => err.msg)
        const message = errorMsgs.join(". ")
        return next(new AppError(message, 400))
    }
    next()
}

const createUserValidators = [
    body("name")
        .notEmpty()
            .withMessage("Name cannot be empty")
        .isString()
            .withMessage("Name must be a string"),
    body("email")
        .isEmail()
            .withMessage("Enter e valid email"),
    body("password")
        .isLength({ min:8 })
            .withMessage("Password requires at least 8 characters")
        .isAlphanumeric()
            .withMessage("Password should contain letters and numbers"),
    checkResult
]

module.exports = { createUserValidators }