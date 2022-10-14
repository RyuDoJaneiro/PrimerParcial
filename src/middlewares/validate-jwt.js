const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) =>
{
        let token = req.headers.authorization;

        if (!token) {
                return res.status(401).json({
                        msg: "Error de autenticación - No hay token en la petición"
                })
        }
        
        try {
                const { uid } = await jwt.verify(token, process.env.SECRET);
                const user = await User.findById(uid);

                if (!user)
                {
                        return res.json({
                                error: "Token no válido - El usuario no existe en la base de datos"
                        });
                }

                if (!user.isActive) {
                        return res.json({
                            msg: 'Token no válido - Usuario inactivo'
                        });
                }

                req.user = user;

                next();
        } catch (error)
        {
                console.log(error);
                res.status(401).json({
                        msg: "Error en la auntenticación - Token no válido"
                })
        }
}

module.exports = validateJWT;