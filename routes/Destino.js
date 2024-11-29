const express = require('express');
const Destino = require("d:/JOSUE LM - UC/UNIVERSIDAD/PROYECTO - TURISMO/agenciaTurismo/controllers/Destino"); // Modelo de Paquete

const rutDestino = express.Router();

rutDestino.get('/destinos', Destino.getDestino);

module.exports = rutDestino;