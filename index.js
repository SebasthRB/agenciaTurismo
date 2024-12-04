const {makeExecutableSchema} = require('@graphql-tools/schema');
const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

const express = require("express");
const cors = require("cors");
const BodyParser = require('body-parser');

const Paquete_rutas = require('../agenciaTurismo/routes/Paquete');
const Destino_rutas = require("../agenciaTurismo/routes/Destino");
const { graphql } = require('graphql');
const Paquete = require('./models/Paquete');

const app = express();
app.use(cors());
app.use(BodyParser.json()); // Para manejar datos JSON en las solicitudes

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET', 'POST', 'OPTIONS', 'PUT', 'DELETE');
    next();
  })

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use('/api', Destino_rutas);
app.use('/api', Paquete_rutas);

//Conectar a la db e iniciar Servidor

const server = new ApolloServer({
    schema,
    context: () => ({
        Paquete, // Pasar modelo al contexto
  }),
});



const iniciar = async () => {
    
    await conectarDB();

    server.listen().then( ({url}) => {
        console.log(`Servidor listo en la URL ${url}`)
    })
}

iniciar();