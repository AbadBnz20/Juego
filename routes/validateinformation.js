const express = require('express');
const ValidateInformation = require('../controllers/Validate');
const validarJWT = require('../helpers/validateJwt');


const router = express.Router();

router.get('/validate',[validarJWT], ValidateInformation);


module.exports = router;