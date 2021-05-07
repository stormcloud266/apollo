import { GraphQLServer } from 'graphql-yoga'

const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {
	Query: {
		greeting: (parent, args, ctx, info) =>
			args.name ? `Hello, ${args.name}!` : 'Hello!',
		me: () => ({
			id: '123098',
			name: 'Tdawg',
			email: '12sjd@skj.com',
			age: 30,
		}),
		post: () => ({
			id: '12308',
			title: 'Tdawg',
			body: '12sjd@skj.com',
			published: true,
		}),
	},
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))
