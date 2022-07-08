const { db, DataTypes } = require("../utils/database.util")

const Games = db.define("games", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    genre: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: "active"
    }
})

module.exports = { Games }