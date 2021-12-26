// ejecutar funciones cuando una url es consultada
const pooldb = require("../db");

const getAllTasks = async (req, res) => {
  try {
    const allTasks = await pooldb.query("SELECT * FROM task");
    //console.log(allTasks);
    res.json(allTasks.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pooldb.query("SELECT * FROM task WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const createTask = async (req, res) => {
  const task = req.body;
  const { title, descripcion } = task;
  try {
    const result = await pooldb.query(
      "INSERT INTO task(title, description) VALUES ($1, $2) RETURNING *", // RETURNING praa que devuelva los valores insertados
      [title, descripcion]
    );
    //const {title, descripcion} = req.body // tambien se puede poner asi y te ahorras 1 linea
    //console.log(title, descripcion);
    //console.log(task);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message }); //esto esta bien en desarrollo, para produccion se mandaun mensaje 500 o algo asi
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pooldb.query("DELETE FROM task WHERE id = $1", [id]); // RETURNING * luego del $1 devuelve el task eliminado
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Tarea no encontrada",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Es obligatirio un titulo",
      });
    }
    const result = await pooldb.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    //console.log(result);
    if (result.rowCount === 0) {
      return res.status(400).json({
        message: "Tarea no encontrada",
      });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
