const User = require("../src/models/user");
const generateJWT = require("../src/helpers/generate-jwt");
const bcrypt = require("bcrypt");

const ctrlAuth = {};

ctrlAuth.logIn = async (req, res) =>
{
        const { userName, userPassword } = req.body;

        try {
                // Buscar al usuario
                const user = await User.findOne({userName});

                // Verificar si existe en la base de datos
                if (!user) {
                        return res.status(400).json({
                                ok: false,
                                msg: "Error al autenticarse - Usuario no encontrado"
                        });
                }

                if (!user.isActive)
                {
                        return res.status(400).json({
                                ok: false,
                                msg: "Error al autenticarse - Usuario inactivo"
                        })
                }

                const validatePassword = bcrypt.compareSync(userPassword, user.userPassword);

                if (!validatePassword)
                {
                        return res.json({
                                msg: "Error al autenticar el usuario - Contraseña incorrecta"
                        });
                }

                const token = await generateJWT({ uid: user._id });
                return res.json({
                        token,
                        session: `★ | Actual session as ${user.userName}`
                });
        } catch (error)
        {
                console.log(error);
                return res.json({ msg: "Error al iniciar sesión" });
        }
}

module.exports = ctrlAuth;