
const Paquete = require("d:/JOSUE LM - UC/UNIVERSIDAD/PROYECTO - TURISMO/agenciaTurismo/models/Paquete"); // Modelo de Paquete

const controllerPaquete = {

    // Endpoint para obtener paquetes
    getPaquete: (req, res) => {
        const query = Paquete.find({});

        query.sort('-date').exec((err, Paquete) => {

            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al extraer los paquetes'
                });
            }

            if(!Paquete){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay paqueres para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                Paquete
            });
        });
    }
}

module.exports = controllerPaquete;

  