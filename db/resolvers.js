const Usuario = require('../models/Usuario');
const Agencia = require('../models/Agencia');
const Destino = require('../models/Destino');
const Paquete = require('../models/Paquete');
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
        obtenerAgencias: async () => {
            try {
                return await Agencia.find({});
            } catch (error) {
                console.log(error);
            }
        },
        obtenerDestinos: async () => {
            try {
                return await Destino.find({}).populate('paquete');
            } catch (error) {
                console.log(error);
            }
        },
        obtenerPaquetes: async () => {
            try {
                return await Paquete.find({}).populate('agencia');
            } catch (error) {
                console.log(error);
            }
        },
        obtenerPaquetePorId: async (_, { id }) => {
            try {
                return await Paquete.findById(id).populate('agencia');
            } catch (error) {
                console.log(error);
            }
        },
        obtenerDestinoPorId: async (_, { id }) => {
            try {
                return await Destino.findById(id).populate('paquete');
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
            }
        },

        // Crear una nueva agencia
        crearAgencia: async (_, { input }) => {
            try {
                const nuevaAgencia = new Agencia(input);
                await nuevaAgencia.save();
                return nuevaAgencia;
            } catch (error) {
                console.log(error);
            }
        },

        // Crear un nuevo destino
        crearDestino: async (_, { input }) => {
            try {
                const nuevoDestino = new Destino(input);
                await nuevoDestino.save();
                return nuevoDestino;
            } catch (error) {
                console.log(error);
            }
        },

        // Crear un nuevo paquete turístico
        crearPaquete: async (_, { input }) => {
            try {
                const nuevaPaquete = new Paquete(input);
                await nuevaPaquete.save();
                return nuevaPaquete;
            } catch (error) {
                console.log(error);
            }
        }
    }
};

module.exports = resolvers;