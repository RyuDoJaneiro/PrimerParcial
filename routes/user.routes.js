const router = require("express").Router();
const { getUsers, postUser, putUser, deleteUser } = require("../controllers/user.controllers");

const validateJWT = require('../src/middlewares/validate-jwt');
const isAdmin = require("../src/middlewares/is-Admin");

router.get("/user", [validateJWT, isAdmin], getUsers);
router.post("/user", [], postUser);
router.put("/user/:id", [], putUser);
router.delete("/user/:id", [], deleteUser);

module.exports = router;