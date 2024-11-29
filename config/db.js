const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectarDB = async () => {
    try{

        await mongoose.connect(process.env.DB_MONGO).then(() =>{
            console.log('base de datos conectada');

        })

    }   catch (error) {
        console.log('Hubo un error con la conexión de la base de datos');
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB;