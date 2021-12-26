const express = require("express");
const morgan = require("morgan");

const taskRoutes = require("./routes/tasks.routes"); // se importa la ruta en la constante taskRoutes

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoutes);

app.listen(4000);
console.log("Server on port 4000");
