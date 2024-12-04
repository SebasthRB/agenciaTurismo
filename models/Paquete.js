const mongoose = require('mongoose');

const paqueteSchema = new mongoose.Schema({
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
        required: true,
        trim: true
    },
    duracion: { 
        type: Number, 
        required: true,
        trim: true
    }, // duración en días
    destinoPrincipal: { 
        type: String, 
        required: true,
        trim: true
    },
    incluye: { 
        type: [String], 
        required: true,
        trim: true
    },
    grupo: { 
        type: Number, 
        required: true,
        trim: true
    }, // capacidad del grupo
    calificacion: { 
        type: Number, 
        required: true,
        trim: true
    }, // promedio de calificación
    foto: { 
        type: String, 
        required: true,
        trim: true
    }, // URL de la imagen
    agencia: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Agencia", 
        required: true
    },
    destinos: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Destino", 
        required: true 
    }],
    telefono: {
        type: String,
        required: false,
        trim: true
    },
    fecha_creacion: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model("Paquete", paqueteSchema);
