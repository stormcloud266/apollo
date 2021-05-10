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

const demoComments = [
	{
		id: '1c',
		text: 'testing comments',
		author: '1',
		post: '3p',
	},
	{
		id: '2c',
		text: 'the truth is out there',
		author: '1',
		post: '2p',
	},
	{
		id: '3c',
		text: 'scuuuuuuulllaaay',
		author: '2',
		post: '1p',
	},
	{
		id: '4c',
		text: 'morleys',
		author: '3',
		post: '1p',
	},
]

const typeDefs = `
  type Query {
    me: User!
    post: Post!
    comments: [Comment]!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
		comments: (parent, args, ctx, info) => demoComments,
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
		comments: (parent, args, ctx, info) =>
			demoComments.filter((comment) => comment.post === parent.id),
	},
	User: {
		posts: (parent, args, ctx, info) =>
			demoPosts.filter((post) => post.author === parent.id),
		comments: (parent, args, ctx, info) =>
			demoComments.filter((comment) => comment.author === parent.id),
	},
	Comment: {
		author: (parent, args, ctx, info) =>
			demoUsers.find((user) => user.id === parent.author),
		post: (parent, args, ctx, info) =>
			demoPosts.find((post) => post.id === parent.post),
	},
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on http://localhost:4000/'))
