const express = require("express")


//Controllers
const { createUser, login, getAllUsers, updateUser, deleteUser } = require("../controllers/users.controller")

//Middlewares
const { createUserValidators } = require("../middlewares/validators.middleware")
const { userExists } = require("../middlewares/userExist.middleware")
const { protectSession, protectUserAccount } = require("../middlewares/auth.middleware")

const userRouter = express.Router()

userRouter.post("/signup", createUserValidators, createUser)
userRouter.post("/login", login)
userRouter.patch("/:id", protectSession, userExists, protectUserAccount, updateUser)
userRouter.delete("/:id", protectSession, userExists, protectUserAccount, deleteUser)
userRouter.get("/", protectSession, getAllUsers)

//01-07-2022 01:25:00
//acomodar con un userRouter.use(protectSession)
//acomodar con un userRouter.use("/:id", userExists)
//acomodar con un userRouter.route("/:id").patch(updateUser).delete(deleteUser)...

module.exports = { userRouter }
