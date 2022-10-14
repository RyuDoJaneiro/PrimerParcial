const User = require("../src/models/user");
const bcrypt = require("bcrypt");
const ctrlUser = {};

ctrlUser.getUsers = async (req, res) =>
{
        const users = await User.find();

        return res.json({users});
}

ctrlUser.postUser = async (req, res) => 
{
        const { userName, userPassword: receivedPassword, role, ...otherData } = req.body;

        // Encriptar la contraseña recibida
        const newPassword = bcrypt.hashSync(receivedPassword, 10);
        
        const newUser = new User({
                userName,
                userPassword: newPassword,
                role,
                otherData
        })

        try {
                const savedUser = await newUser.save();
                return res.json({
                        msg: "Usuario creado correctamente"
                })
        } catch (error) {
                res.json({
                        msg: "Hubo un error al crear al usuario"
                })
        }
}

ctrlUser.putUser = async (req, res) =>
{
        const id = req.params.id;
        const { userPassword: receivedPassword, ...otherData } = req.body;
        const newPassword = bcrypt.hashSync(receivedPassword, 10);

        try {
                const updatedUser = await User.findByIdAndUpdate(id, {userPassword:newPassword, ...otherData});
                return res.json({
                        msg: "Usuario actualizado correctamente"
                })
        } catch (error){
                console.log(error.message);
                return res.status(500).json({
                        msg: "Ocurrió un error al actualizar al usuario"
                })
        }
}

ctrlUser.deleteUser = async (req, res) =>
{
        const id = req.params.id;

        try {
                const deletedUser = await User.findByIdAndUpdate(id, {isActive: false});
                return res.json({
                        msg: "Usuario eliminado correctamente"
                })
        } catch (error) {
                console.log(error.message)
                return res.status(500).json({
                        msg: "Ocurrió un error al eliminar al usuario"
                })
        }
}

module.exports = ctrlUser;