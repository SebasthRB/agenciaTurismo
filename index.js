const {ApolloServer, gql} = require('apollo-server');


const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
//Conectar a la db

conectarDB();

const server = new ApolloServer({typeDefs,resolvers});

server.listen().then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})