const mongoose = require("mongoose");

const destinoSchema = new mongoose.Schema({
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
    puntos_interes: { 
        type: [String], 
        required: true, // Es obligatorio proporcionar al menos un punto de interés
    }, 
    actividades: { 
        type: [String], 
        required: true, // Es obligatorio proporcionar al menos una actividad
    }, 
    clima: { 
        type: String, 
        required: true,
        trim: true  
    },
    mejor_epoca: { 
        type: String, 
        required: true,
        trim: true  
    },
    paquete: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paquete', // Relación con el modelo Paquete
        required: false, 
    },
    agencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agencia', // Relación con el modelo Agencia
        required: true, // Se considera obligatorio asociar un destino con una agencia
    },
    fecha_creacion: { 
        type: Date, 
        default: Date.now 
    },
    foto: { 
        type: String, 
        required: false,
        trim: true
    }
});

module.exports = mongoose.model("Destino", destinoSchema);
