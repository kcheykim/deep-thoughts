const express = require('express');
const { ApolloServer } = require('apollo-server-express'); //import ApolloServer
const { typeDefs, resolvers } = require('./server/schemas'); //import our typeDefs and resolvers
const db = require('./server/config/connection');
const { authMiddleware } = require('./server/utils/auth'); //import the authentication

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => { //create a new Apollo server adn pass in our schema data
  const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: authMiddleware
  });

  await server.start(); //start the Apollo server
  server.applyMiddleware({ app }); //integrate our Apollo server with the Express application as middleware
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer() //initialize the Apollo server

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
