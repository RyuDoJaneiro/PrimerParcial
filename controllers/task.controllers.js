const { search } = require("../routes/user.routes");
const Task = require("../src/models/task");
const ctrlTask = {};

ctrlTask.getTasks = async (req, res) =>
{
        const tasks = await Task.find({userId: req.user._id});

        return res.json(tasks);
}

ctrlTask.postTask = async (req, res) => 
{
        const { taskName, taskDescription } = await req.body;

        // Crear nueva tarea
        const newTask = new Task({
                taskName,
                taskDescription,
                userId: req.user._id
        });

        // Intentar guardar la nueva tarea
        try {
                const savedTask = await newTask.save(); 
                return res.json("La tarea fue creada con éxito");
        } catch (error) {
                console.log(error);
        }
}

ctrlTask.putTask = async (req, res) => 
{
        const id = req.params.id;
        const { ...otherData } = req.body;

        if (!id)
        {
                return res.status(400).json({
                        msg: "ID faltante en la petición"
                })
        }

        try {
                const searchTask = await Task.findOne({isActive: true, _id: id, userId: req.user._id});
                const updatedTask = await Task.findByIdAndUpdate(searchTask._id, {...otherData})
                return res.json({
                        msg: "Tarea actualizada con éxito",
                        updatedTask
                });
        } catch (error) {
                console.log(error.message);
                return res.status(500).json({
                        msg: 'Error al actualizar la tarea',
                        error: error.message
                    });
        }
}

ctrlTask.deleteTask = async (req, res) =>
{
        const id = req.params.id;

        try {
                const searchTask = await Task.findOne({isActive: true, _id: id, userId: req.user._id});
                const removedTask = await Task.findByIdAndUpdate(searchTask._id, {isActive: false});
                return res.json({msg: "Tarea removida correctamente", searchTask: `${searchTask}`});
        } catch (error) {
                await res.status(500).json({
                        msg: "Error al eliminar la tarea",
                        error: error.message
                });
        }
}

module.exports = ctrlTask;