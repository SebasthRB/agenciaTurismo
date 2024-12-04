const express = require('express');
const Destino = require("../controllers/Destino"); // Modelo de Paquete

const rutDestino = express.Router();

rutDestino.get('/destinos', Destino.getDestino);

module.exports = rutDestino;