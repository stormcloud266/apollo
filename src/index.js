import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    hello: String!
    name: String!
  }
`

const resolvers = {
	Query: {
		hello: () => `My first query`,
		name: () => `Tawnee`,
	},
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
