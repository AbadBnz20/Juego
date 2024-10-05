const express = require('express');
const { ValidateCode } = require('../controllers/Code');
const { check } = require('express-validator');
const { validarCampos } = require('../helpers/validatedate');
const router = express.Router();

router.post('/code',[
    check('code', 'El Codigo es obligatorio').not().isEmpty(),
    validarCampos
], ValidateCode)


module.exports = router;