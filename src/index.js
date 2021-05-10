import { GraphQLServer } from 'graphql-yoga'

const demoUsers = [
	{
		id: '1',
		name: 'tawnee',
		email: 'test@mail.com',
	},
	{
		id: '2',
		name: 'babs',
		email: 'babs@mail.com',
		age: 14,
	},
	{
		id: '3',
		name: 'bowie',
		email: 'ziggy@mail.com',
	},
]

const demoPosts = [
	{
		id: '1p',
		title: 'title',
		body: 'this is the bod',
		published: true,
		author: '1',
	},
	{
		id: '2p',
		title: 'test',
		body: 'this is the bod god',
		published: false,
		author: '1',
	},
	{
		id: '3p',
		title: 'bingo',
		body: 'this is the cat',
		published: true,
		author: '2',
	},
]

const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
`

const resolvers = {
	Query: {
		users: (parent, args, ctx, info) => {
			if (!args.query) {
				return demoUsers
			}

			return demoUsers.filter((user) =>
				user.name.toLowerCase().includes(args.query.toLowerCase())
			)
		},
		posts: (parent, args, ctx, info) => {
			if (!args.query) {
				return demoPosts
			}

			return demoPosts.filter(
				(post) =>
					post.title.toLowerCase().includes(args.query.toLowerCase()) ||
					post.body.toLowerCase().includes(args.query.toLowerCase())
			)
		},
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
	Post: {
		author: (parent, args, ctx, info) =>
			demoUsers.find((user) => user.id === parent.author),
	},
	User: {
		posts: (parent, args, ctx, info) =>
			demoPosts.filter((post) => post.author === parent.id),
	},
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000/'))
