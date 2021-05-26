import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466',
})

const createPostForUser = async (authorId, data) => {
	const post = await prisma.mutation.createPost(
		{
			data: {
				...data,
				author: {
					connect: {
						id: authorId,
					},
				},
			},
		},
		'{ id }'
	)

	const user = await prisma.query.user(
		{
			where: {
				id: authorId,
			},
		},
		'{ id name email posts { id title published } }'
	)

	return user
}

const updatePostForUser = async (postId, data) => {
	const post = await prisma.mutation.updatePost(
		{
			where: {
				id: postId,
			},
			data,
		},
		'{ author { id } }'
	)

	const user = await prisma.query.user(
		{
			where: {
				id: post.author.id,
			},
		},
		'{ id name email posts { id title published } }'
	)

	return user
}

// createPostForUser('ckouv8hzl00180801p5xscpso', {
// 	title: 'good books',
// 	body: 'war of art',
// 	published: true,
// }).then((user) => {
// 	console.log(JSON.stringify(user, undefined, 2))
// })

// updatePostForUser('ckp5ohci6000r0901hrzid636', {
// 	title: 'walt whitmans poetry',
// }).then((user) => {
// 	console.log(JSON.stringify(user, undefined, 2))
// })
