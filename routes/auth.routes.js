const { logIn } = require('../controllers/auth.controllers');

const router = require('express').Router();

router.post('/login', logIn )


module.exports = router;