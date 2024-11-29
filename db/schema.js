const { gql } = require('apollo-server');

const typeDefs = gql`
    # Definición de los tipos de datos
    type Usuario {
        _id: ID
        nombre: String
        email: String
        password: String
        registro: String
    }

    type Agencia {
        _id: ID
        nombre: String
        contacto: String
        telefono: String
        email: String
        direccion: String
        fecha_creacion: String
        paquetes: [Paquete]
    }

    type Paquete {
        _id: ID
        nombre: String
        descripcion: String
        precio: Float
        duracion: Int
        destinoPrincipal: String
        incluye: String
        grupo: Int
        calificacion: Float
        foto: String
        agencia: Agencia
        fecha_creacion: String
        destinos: [Destino]
    }

    type Destino {
        _id: ID
        nombre: String
        descripcion: String
        puntos_interes: [String]
        actividades: [String]
        clima: String
        mejor_epoca: String
        paquete: Paquete
        fecha_creacion: String
    }
    
    type Query{
        obtenerCursos : [Curso]
        obtenerTecnologia : [Tecnologia]
    }

    input UsuarioInput{
            nombre: String!
            email: String!
            password: String!
    }

    input PaqueteInput {
        nombre: String!
        descripcion: String!
        precio: Float!
        duracion: Int!
        destino: String!
        incluye: String!
        grupo: Int
        calificacion: Float!
        foto: String
        agencia_id: ID!
    }

    input AgenciaInput {
        nombre: String!
        contacto: String!
        telefono: String!
        email: String!
        direccion: String!
    }

    input DestinoInput {
        nombre: String!
        descripcion: String!
        puntos_interes: [String]!
        actividades: [String]!
        clima: String!
        mejor_epoca: String!
        paquete_id: ID!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    type Token {
        token: String
    }

    # Definición de las mutaciones
    type Mutation {
        crearUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AutenticarInput): Token
        crearPaquete(input: PaqueteInput): Paquete
        crearAgencia(input: AgenciaInput): Agencia
        crearDestino(input: DestinoInput): Destino
    }
`;

module.exports = typeDefs;