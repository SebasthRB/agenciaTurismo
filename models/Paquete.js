const mongoose = require('mongoose');

const PaqueteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    duracion: {
        type: Number,  // duración en días
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    agencia_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agencia',  // Referencia a la agencia que ofrece el paquete
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Paquete', PaqueteSchema);