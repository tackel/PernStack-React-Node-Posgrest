const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const taskRoutes = require("./routes/tasks.routes"); // se importa la ruta en la constante taskRoutes

const app = express();

app.use(cors()); // permite comunicar ambos servidores de manera simple, el backend con el frontend
app.use(morgan("dev"));
app.use(express.json());
app.use(taskRoutes);
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(4000);
console.log("Server on port 4000");
