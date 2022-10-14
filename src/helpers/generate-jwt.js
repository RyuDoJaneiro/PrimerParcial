const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        // Se genera el token con el id del usuario y la palabra secreta
        jwt.sign(uid, "" + process.env.SECRET, {
            expiresIn: '5h'
        }, (err, token) => {
            if(err){
                console.log(err.message);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    })
}


module.exports = generateJWT;