const {gql} = require('apollo-server');


const typeDefs = gql`
    type Curso {
        titulo: String
        tecnologia: String
    }

    type Tecnologia {
        tecnologia: String
    }
    
    type Query{
        obtenerCursos : [Curso]
        obtenerTecnologia : [Tecnologia]
        paquetes: [Paquete]
        destinos: [Destino]
        agencias: [Agencia]
        destinoPorId(id: ID!): Destino
    }
    
    type Agencia {
        _id: ID
        nombre: String
        contacto: String
        telefono: String
        email: String
        direccion: String
        fecha_creacion: String
    }
    
    type Destino {
        _id: ID!
        nombre: String!
        descripcion: String!
        puntos_interes: [String]
        actividades: [String]
        clima: String
        mejor_epoca: String
        paquete_id: ID!
        fecha_creacion: String
    }
    
    type Paquete {
        _id: ID
        nombre: String
        descripcion: String
        precio: Float
        duracion: Int
        destino: String
        incluye: String
        grupo: Int
        calificacion: Float
        foto: String
        agencia_id: ID
        fecha_creacion: String
        telefono: String
    }

    input UsuarioInput{
            nombre: String!
            email: String!
            password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    type Token{
        token: String
    }

    type Mutation{
        crearUsuario(input: UsuarioInput): String
        autenticarUsuario(input: AutenticarInput): Token
    }
`;

module.exports = typeDefs;