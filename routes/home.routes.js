const router = require("express").Router();
const { getHome } = require("../controllers/home.controllers");

const validateJWT = require("../src/middlewares/validate-jwt");

router.get("/", [validateJWT], getHome);

module.exports = router;

