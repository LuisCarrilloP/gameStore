const { db, DataTypes } = require("../utils/database.util")

const Reviews = db.define("reviews", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    gameId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    comment: {
        allowNull: false,
        type: DataTypes.STRING 
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "active"
    }
})

module.exports = { Reviews }