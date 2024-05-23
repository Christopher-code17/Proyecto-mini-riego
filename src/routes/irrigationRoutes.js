const express = require('express');
const irrigationController = require('../controllers/irrigationController');

const router = express.Router();

router.post('/pump/:action', irrigationController.controlPump);

module.exports = router;

