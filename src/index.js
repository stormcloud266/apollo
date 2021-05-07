import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`

const resolvers = {
	Query: {
		id: () => 'abc3123',
		name: () => `Tawnee`,
		age: () => 31,
		employed: () => true,
		gpa: () => 4.0,
	},
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
