const mongoose = require("mongoose");

const DBConnection = async () =>
{
        try {
                mongoose.connect("mongodb://127.0.0.1:27017/Tasks");
                console.log("➔ | Connected to MongoDB");
        } catch (error) {
                console.log("Ocurrió un error al intentar conectar a la base de datos: " + error);
        }
}

module.exports = DBConnection;