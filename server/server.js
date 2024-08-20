require('dotenv').config()
const express = require('express')
const path = require('path')
const db = require('./config/connection')
// const routes = require('./routes')
const cors = require('cors')

// Import the ApolloServer class
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

// Import the two parts of a GraphQL schema
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection')
const { authMiddleware } = require('./utils/auth')

const PORT = process.env.PORT || 3001
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


const startApolloServer = async () => {
  await server.start()

  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

app.use('/graphql', expressMiddleware(server, { context: authMiddleware } ))

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  })
}

// app.use(routes)

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
})
})
}

// Call the async function to start the server
startApolloServer()
