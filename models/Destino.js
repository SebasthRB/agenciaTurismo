const mongoose = require('mongoose');

const DestinoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    puntos_interes: {
        type: [String],  // Un arreglo de cadenas con los puntos de interés
        required: true
    },
    actividades: {
        type: [String],  // Un arreglo de cadenas con las actividades disponibles
        required: true
    },
    clima: {
        type: String,  // Clima del destino (por ejemplo: Tropical, Desértico, etc.)
        required: true
    },
    mejor_epoca: {
        type: String,  // La mejor época para visitar el destino
        required: true
    },
    paquete_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paquete',  // Referencia al paquete que ofrece el paquete
        required: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Destino', DestinoSchema);

