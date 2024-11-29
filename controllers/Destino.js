
const Destino = require("d:/JOSUE LM - UC/UNIVERSIDAD/PROYECTO - TURISMO/agenciaTurismo/models/Destino"); // Modelo de Paquete

const controllerDestino = {

    // Endpoint para obtener paquetes
    getDestino: (req, res) => {
        const query = Destino.find({});

        query.sort('-date').exec((err, Destino) => {

            if(err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al extraer los paquetes'
                });
            }

            if(!Destino){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay paqueres para mostrar'
                });
            }

            return res.status(200).send({
                status: 'success',
                Destino
            });
        });
    }
}

module.exports = controllerDestino;