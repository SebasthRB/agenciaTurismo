const express = require('express');
const Paquete = require("../controllers/Paquete"); // Modelo de Paquete

const rutPaquete = express.Router();

rutPaquete.get('/paquetes', Paquete.getPaquete);

module.exports = rutPaquete;