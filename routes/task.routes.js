const router = require("express").Router();
const { getTasks, postTask, putTask, deleteTask } = require("../controllers/task.controllers");

const validateJWT = require('../src/middlewares/validate-jwt');

router.get("/task", [validateJWT], getTasks);
router.post("/task/", [validateJWT], postTask);
router.put("/task/:id", [validateJWT], putTask);
router.delete("/task/:id", [validateJWT], deleteTask);

module.exports = router;