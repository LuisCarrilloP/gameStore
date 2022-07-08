const { db, DataTypes } = require("../utils/database.util")

const Users = db.define("users", {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "active"
    }
})

module.exports = { Users }