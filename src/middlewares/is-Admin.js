const isAdmin = (req, res, next) => {
        if(!req.user.role.find(x => x == "admin_user")){
            return res.status(401).json({
                msg:'No autorizado - No eres administrador'
            })
    
        }
    
        next();
    }
    
    
    module.exports = isAdmin;