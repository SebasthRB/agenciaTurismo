const Usuario = require('../models/Usuario');
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
                throw new Error('Contrasñea incorrecta')
            }

            return{
                token: crearToken(existeUsuario, process.env.SECRETA, '2hr')
            }
        }
    }
}

module.exports = resolvers;