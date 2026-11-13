const { Router } = require('express');
const { registerUser } = require('../controllers/auth.controller');

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;