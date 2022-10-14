const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json()); // Permite al servidor usar archivos .json
const path = require("path");

// Conexión con la base de datos
const DBConnection = require("./src/db/connection");
DBConnection();

// Archivos estáticos
app.use(express.static(path.join(__dirname, "/public")));

// Plantillas .ejs
app.set("/views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

// Dependencias
require("dotenv").config();
require("ejs");
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use(require("./routes/user.routes"));
app.use(require("./routes/task.routes"));
app.use(require("./routes/home.routes"));
app.use(require("./routes/auth.routes"));

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`➔ | Server listening at http://localhost:${port}`));