const { app } = require("./app")

//Models
const { Users } = require("./models/users.model")
const { Reviews } = require("./models/reviews.model")
const { Consoles } = require("./models/consoles.model")
const { Games } = require("./models/games.model")


//Utils
const { db } = require("./utils/database.util")

//Authenticate db
db.authenticate()
    .then(console.log("Db authenticated"))
    .catch(err => console.log(err))

//Db relations
    //Users 1 -- M Reviews
    Users.hasMany(Reviews, {foreignKey : "userId"})
    Reviews.belongsTo(Users)

    //Games 1 -- M Reviews
    Games.hasMany(Reviews, { foreignKey: "gameId"})
    Reviews.belongsTo(Users)

    //Games m--gamesinconsoles--m Consoles
    Games.belongsToMany(Consoles, { through: "gamesInConsoles" }) //same name as in db.define in model
    Consoles.belongsToMany(Games, { through: "gamesInConsoles" })
//Sync db
db.sync()
    .then(console.log("Db synced"))
    .catch(err => console.log(err))

app.listen(4300, () => {
    console.log("App running");
})