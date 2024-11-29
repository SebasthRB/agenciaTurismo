const mongoose = require('mongoose');

const agenciaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim:true
    },
    contacto: {
        type: String,
        required:true,
        trim:true,
    },
    telefono:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    direccion:{
        type: String,
        required:true,
        trim:true
    },
    fecha_creacion:{
        type: Date, 
        default: Date.now()
    },
});

module.exports = mongoose.model('Agencia', agenciaSchema);