const mongoose = require("mongoose");

const destinoSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true,
        trim:true  
    },
    descripcion: { 
        type: String, 
        required: true,
        trim:true  
    },
    puntos_interes: { 
        type: [String], 
        required: true,
        trim:true  
    }, // Array de strings
    actividades: { 
        type: [String], 
        required: true,
        trim:true  
    }, // Array de strings
    clima: { 
        type: String, 
        required: true,
        trim:true  
    },
    mejor_epoca: { 
        type: String, 
        required: true,
        trim:true  
    },
    paquete_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Paquete', 
        required: true,
        trim:true  
    },
    fecha_creacion: { 
        type: Date, 
        default: Date.now 
    },
});
  
module.exports = mongoose.model("Destino", destinoSchema);
