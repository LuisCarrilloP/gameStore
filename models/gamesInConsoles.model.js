const { db, DataTypes } = require("../utils/database.util")

const GamesInConsoles = db.define("gamesInConsoles", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    gameId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    consoleId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "active"
    }
})

module.exports = { GamesInConsoles }