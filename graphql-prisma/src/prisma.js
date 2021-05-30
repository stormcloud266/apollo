import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: 'http://localhost:4466',
})

const createPostForUser = async (authorId, data) => {
	const userExists = await prisma.exists.User({ id: authorId })

	if (!userExists) {
		throw new Error('User not found.')
	}

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
		'{ id author { id name email posts { id title published } } }'
	)

	return post.author
}

const updatePostForUser = async (postId, data) => {
	const postExists = await prisma.exists.Post({ id: postId })

	if (!postExists) {
		throw new Error('Post not found.')
	}

	const post = await prisma.mutation.updatePost(
		{
			where: {
				id: postId,
			},
			data,
		},
		'{ author { id name email posts { id title published } } }'
	)

	return post.author
}

// createPostForUser('ckouv8hzl00180801p5xscpso', {
// 	title: 'good books 4',
// 	body: 'war of art',
// 	published: true,
// })
// 	.then((user) => {
// 		console.log(JSON.stringify(user, undefined, 2))
// 	})
// 	.catch((err) => console.log(err.message))

// updatePostForUser('ckp5ohci6000r0901hrzid636', {
// 	title: "poe's poetry",
// })
// 	.then((user) => {
// 		console.log(JSON.stringify(user, undefined, 2))
// 	})
// 	.catch((err) => console.log(err.message))
