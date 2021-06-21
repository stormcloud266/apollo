import bcrypt from 'bcryptjs'

export const Mutation = {
	createUser: async (parent, args, { prisma }, info) => {
		if (args.data.password.length < 8) {
			throw new Error('Password must be 8 characters or longer.')
		}
		const password = await bcrypt.hash(args.data.password, 10)

		return prisma.mutation.createUser(
			{
				data: {
					...args.data,
					password,
				},
			},
			info
		)
	},
	deleteUser: async (parent, args, { prisma }, info) => {
		return prisma.mutation.deleteUser({ where: { id: args.id } }, info)
	},
	updateUser: async (parent, args, { prisma }, info) => {
		return prisma.mutation.updateUser(
			{
				where: {
					id: args.id,
				},
				data: args.data,
			},
			info
		)
	},
	createPost: async (parent, args, { prisma }, info) => {
		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: args.data.author,
						},
					},
				},
			},
			info
		)
	},
	deletePost: async (parent, args, { prisma }, info) => {
		return prisma.mutation.deletePost({ where: { id: args.id } }, info)
	},
	updatePost: async (parent, args, { prisma }, info) => {
		return prisma.mutation.updatePost(
			{
				where: {
					id: args.id,
				},
				data: args.data,
			},
			info
		)
	},
	createComment: async (parent, args, { prisma }, info) => {
		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: args.data.author,
						},
					},
					post: {
						connect: {
							id: args.data.post,
						},
					},
				},
			},
			info
		)
	},
	deleteComment: async (parent, args, { prisma }, info) => {
		return prisma.mutation.deleteComment({ where: { id: args.id } }, info)
	},
	updateComment: async (parent, args, { prisma }, info) => {
		return prisma.mutation.updateComment(
			{
				where: {
					id: args.id,
				},
				data: args.data,
			},
			info
		)
	},
}
