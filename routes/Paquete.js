const express = require('express');
const Paquete = require("d:/JOSUE LM - UC/UNIVERSIDAD/PROYECTO - TURISMO/agenciaTurismo/controllers/Paquete"); // Modelo de Paquete

const rutPaquete = express.Router();

rutPaquete.get('/paquetes', Paquete.getPaquete);

module.exports = rutPaquete;