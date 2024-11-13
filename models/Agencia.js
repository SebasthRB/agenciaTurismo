const mongoose = require('mongoose');

const AgenciaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    contacto: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Agencia', AgenciaSchema);