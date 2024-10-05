const express = require('express');
const InitChat = require('../controllers/Chat');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.post('/chat', InitChat)


module.exports = router;