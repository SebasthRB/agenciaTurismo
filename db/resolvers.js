const Usuario = require('../models/Usuario');
const Paquete = require('../models/Paquete');
const Destino = require('../models/Destino');
const Agencia = require('../models/Agencia');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

// Función para crear y firmar un JWT
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, email } = usuario;
    return jwt.sign({ id, email }, secreta, { expiresIn });
}

const resolvers = {
    Query: {
        obtenerUsuarios: async () => {
            try {
                return await Usuario.find({});
            } catch (error) {
                console.log(error);
            }
        },
        
        agencias: async () => {
            try {
                return await Agencia.find(); // Para obtener todas las agencias
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener las agencias');
            }
        },

        destinos: async () => {
            try {
                return await Destino.find().populate('agencia'); // Poblar la información de la agencia
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener los destinos');
            }
        },

        destinoPorId: async (_, { id }) => {
            try {
                return await Destino.findById(id).populate('agencia');
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener el destino');
            }
        },

        paquetes: async () => {
            try {
                return await Paquete.find().populate('agencia'); // Poblar la información de la agencia
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener los paquetes');
            }
        },

        obtenerPaquetePorId: async (_, { id }) => {
            try {
                return await Paquete.findById(id).populate('agencia').populate('destinos'); // Poblamos los destinos
            } catch (error) {
                console.log(error);
            }
        },

        obtenerDestinoPorId: async (_, { id }) => {
            try {
                return await Destino.findById(id).populate('agencia'); 
            } catch (error) {
                console.log(error);
            }
        },

        obtenerAgenciaPorId: async (_, { id }) => {
            try {
                return await Agencia.findById(id);
            } catch (error) {
                console.log(error);
            }
        },

        obtenerDestinosPorPaquete: async (_, { id }) => {
            try {
                const destinos = await Destino.find({ paquete_id: id }).populate('agencia');
                return destinos;
            } catch (error) {
                console.error(error);
                throw new Error('Error al obtener los destinos del paquete');
            }
        }
    },

    Mutation: {
        // Crear un nuevo usuario
        crearUsuario: async (_, { input }) => {
            const { email, password } = input;
            const existeUsuario = await Usuario.findOne({ email });

            if (existeUsuario) {
                throw new Error('El usuario ya está registrado');
            }

            try {
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password, salt);

                const nuevoUsuario = new Usuario(input);
                await nuevoUsuario.save();
                return "Usuario creado correctamente";
            } catch (error) {
                console.log(error);
            }
        },

        // Autenticación de usuario
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input;
            const existeUsuario = await Usuario.findOne({ email });

            if (!existeUsuario) {
                throw new Error("El usuario no existe");
            }

            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error('Contraseña incorrecta');
            }

            return {
                token: crearToken(existeUsuario, process.env.SECRETA, '2hr')
            };
        },

        // Crear una nueva agencia
        crearAgencia: async (_, { input }) => {
            try {
                const nuevaAgencia = new Agencia(input);
                await nuevaAgencia.save();
                return nuevaAgencia;
            } catch (error) {
                console.log(error);
                throw new Error('Error al crear la agencia');
            }
        },

        // Crear un nuevo destino
        crearDestino: async (_, { input }) => {
            const { agencia_id, ...resto } = input;
            try {
                const nuevoDestino = new Destino({
                    ...resto,
                    agencia: agencia_id, // Asociamos la agencia al destino
                });
        
                await nuevoDestino.save();
        
                // Poblar el campo 'agencia' en el destino antes de devolverlo
                const destinoConAgencia = await Destino.findById(nuevoDestino._id).populate('agencia');
        
                return destinoConAgencia;
            } catch (error) {
                console.error(error);
                throw new Error('Error al crear el destino');
            }
        },

        // Crear un nuevo paquete turístico
        crearPaquete: async (_, { input }) => {
            const { agencia_id, destinos, telefono, ...resto } = input;

            try {
                const nuevoPaquete = new Paquete({
                    ...resto,
                    agencia: agencia_id, // Asociamos la agencia al paquete
                    destinos, // Asociamos los destinos al paquete
                    telefono, // Establecemos el teléfono de contacto
                });

                await nuevoPaquete.save();

                // Ahora actualizamos los destinos para asociarlos al nuevo paquete
                if (destinos && destinos.length > 0) {
                    await Destino.updateMany(
                        { _id: { $in: destinos } },
                        { $push: { paquetes: nuevoPaquete._id } }
                    );
                }

                return nuevoPaquete;
            } catch (error) {
                console.log(error);
                throw new Error('Error al crear el paquete');
            }
        }
    }
};

module.exports = resolvers;