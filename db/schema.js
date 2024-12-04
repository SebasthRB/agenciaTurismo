const { gql } = require('apollo-server');

const typeDefs = gql`
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
    destinos: [Destino]  # Agregado para listar destinos creados por la agencia
}

type Paquete {
    _id: ID
    nombre: String
    descripcion: String
    precio: Float
    duracion: Int
    destinoPrincipal: String
    incluye: [String]
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
    agencia: Agencia  # Agregado para mostrar la agencia que creó el destino
    fecha_creacion: String
}

input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
}

input PaqueteInput {
    nombre: String!
    descripcion: String!
    precio: Float!
    duracion: Int!
    destinoPrincipal: String!
    incluye: [String!]!
    grupo: Int
    calificacion: Float!
    foto: String
    agencia_id: ID!
    destinos: [ID]
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
    agencia_id: ID! 
}

input AutenticarInput {
    email: String!
    password: String!
}

type Token {
    token: String
}

type Query {
    obtenerUsuarios: [Usuario]
    agencias: [Agencia]
    destinos: [Destino]
    destinoPorId(id: ID!): Destino
    paquetes: [Paquete]
    obtenerDestinosPorPaquete(id: ID!): [Destino]
    obtenerPaquetePorId(id: ID!): Paquete
    obtenerDestinoPorId(id: ID!): Destino
    obtenerAgenciaPorId(id: ID!): Agencia
}

type Mutation {
    crearUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    crearPaquete(input: PaqueteInput): Paquete
    crearAgencia(input: AgenciaInput): Agencia
    crearDestino(input: DestinoInput): Destino
}
`;

module.exports = typeDefs;