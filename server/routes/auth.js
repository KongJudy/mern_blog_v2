const express = require('express');
const { Login } = require('../controllers/auth');

const router = express.Router();

router.post('/login', Login);

module.exports = router;
