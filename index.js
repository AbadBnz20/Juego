const express = require("express");
require('dotenv').config();
const cors = require('cors');
// crear el servidor de express
const app = express();
// CORS
app.use(cors());
// directorio Publico
app.use(express.static('public'))
//lectura y parseo del body
app.use(express.json());
//Rutas
app.use('/api', require('./routes/chat'));
app.use('/api', require('./routes/code'));
app.use('/api', require('./routes/validateinformation'));


// escuchar la peticion
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`)
});