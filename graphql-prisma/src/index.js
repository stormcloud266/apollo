import { GraphQLServer, PubSub } from 'graphql-yoga'
import { Query } from './resolvers/Query'
import { Mutation } from './resolvers/Mutation'
import { User } from './resolvers/User'
import { Post } from './resolvers/Post'
import { Comment } from './resolvers/Comment'
import { Subscription } from './resolvers/Subscription'
import { db } from './db'
import prisma from './prisma'

const pubsub = new PubSub()

const resolvers = {
	Query,
	Mutation,
	Subscription,
	Post,
	User,
	Comment,
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: {
		db,
		pubsub,
		prisma,
	},
})

server.start(() => console.log('Server is running on http://localhost:4000/'))
