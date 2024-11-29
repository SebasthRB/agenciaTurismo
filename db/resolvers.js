const Usuario = require('../models/Usuario');
const Paquete = require('../models/Paquete');
const Destino = require('../models/Destino');
const Agencia = require('../models/Agencia');
const bcryptjs = require('bcryptjs');
const jwt = require ('jsonwebtoken');
require('dotenv').config({path: 'variables.env'})
//crea y firma un JWT
const crearToken = (usuario, secreta, expiresIn) => {
    const {id, email} = usuario;

    return jwt.sign({id, email}, secreta, {expiresIn});
}

const resolvers = {
    Query : {        
        
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
              return await Destino.find(); // Consulta para obtener todos los destinos
            } catch (error) {
              console.error(error);
              throw new Error('Error al obtener los destinos');
            }
        },

        destinoPorId: async (_, { id }) => {
            try {
              return await Destino.findById(id); // Consulta para obtener un destino por ID
            } catch (error) {
              console.error(error);
              throw new Error('Error al obtener el destino');
            }
        },

        paquetes: async () => {
            try {
              return await Paquete.find(); // Consulta para obtener todos los paquetes
            } catch (error) {
              console.error(error);
              throw new Error('Error al obtener los paquetes');
            }
        }
    },

    Mutation: {
        crearUsuario: async(_, {input}) => {
            const {email, password} = input;
            const existeUsuario = await Usuario.findOne({email});
            console.log(existeUsuario)

            //si existe
            if(existeUsuario) {
                throw new Error('El usuario ya esta registrado');
            } try{

                //hashear password
                const salt = await bcryptjs.genSalt(10);
                input.password  = await bcryptjs.hash(password, salt);
                
                //registrar

                const nuevoUsuario = new Usuario(input);
                //console.log(nuevoUsuario)
                nuevoUsuario.save();
                return "Usuario Creado Correctamente";
            } catch (error) {
                console.log(error);
            }
        },
        autenticarUsuario: async(_, {input}) => {
            const {email, password} = input;

            const existeUsuario = await Usuario.findOne({email})

            //usuario existe
            if(!existeUsuario) {
                throw new Error("El usuario no existe");
            }
            //password correcto

            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto){
                throw new Error('Contraseña incorrecta')
            }

            return{
                token: crearToken(existeUsuario, process.env.SECRETA, '2hr')
            }
        }
    }
}

module.exports = resolvers;