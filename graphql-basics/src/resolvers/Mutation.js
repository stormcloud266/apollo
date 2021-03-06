import uuid from 'uuid/v4'

export const Mutation = {
	createUser: (parent, args, { db }, info) => {
		const emailTaken = db.users.some((user) => user.email === args.data.email)

		if (emailTaken) {
			throw new Error('Email already taken.')
		}

		const user = {
			id: uuid(),
			...args.data,
		}

		db.users.push(user)
		return user
	},
	deleteUser: (parent, args, { db }, info) => {
		const userIndex = db.users.findIndex((user) => user.id === args.id)

		if (userIndex === -1) {
			throw new Error('User not found.')
		}

		const deletedUsers = users.splice(userIndex, 1)
		db.posts = db.posts.filter((post) => {
			const match = post.author === args.id

			if (match) {
				db.comments = db.comments.filter((comment) => comment.post !== args.id)
			}
			return !match
		})

		db.comments = db.comments.filter((comment) => comment.author !== args.id)
		return deletedUsers[0]
	},
	updateUser: (parent, args, { db }, info) => {
		const user = db.users.find((user) => user.id === args.id)

		if (!user) {
			throw new Error('User not found.')
		}

		if (typeof args.data.email === 'string') {
			const emailTaken = db.users.some((user) => user.email === args.data.email)

			if (emailTaken) {
				throw new Error('Email taken.')
			}

			user.email = args.data.email
		}

		if (typeof args.data.name === 'string') {
			user.name = args.data.name
		}

		if (typeof args.data.age !== 'undefined') {
			user.age = args.data.age
		}

		return user
	},
	createPost: (parent, args, { db, pubsub }, info) => {
		const userExists = db.users.some((user) => user.id === args.data.author)

		if (!userExists) {
			throw new Error('User not found.')
		}

		const post = {
			id: uuid(),
			...args.data,
		}

		db.posts.push(post)

		if (args.data.published) {
			pubsub.publish(`post`, {
				post: {
					mutation: 'CREATED',
					data: post,
				},
			})
		}
		return post
	},
	deletePost: (parent, args, { db, pubsub }, info) => {
		const postIndex = db.posts.findIndex((post) => post.id === args.id)

		if (postIndex === -1) {
			throw new Error('Post not found.')
		}

		db.comments = db.comments.filter((comment) => comment.post !== args.id)
		const [post] = db.posts.splice(postIndex, 1)

		if (post.published) {
			pubsub.publish(`post`, {
				post: {
					mutation: 'DELETED',
					data: post,
				},
			})
		}

		return post
	},
	updatePost: (parent, args, { db, pubsub }, info) => {
		const post = db.posts.find((post) => post.id === args.id)
		const originalPost = { ...post }

		if (!post) {
			throw new Error('Unable to find post')
		}

		if (typeof args.data.body === 'string') {
			post.body = args.data.body
		}

		if (typeof args.data.title === 'string') {
			post.title = args.data.title
		}

		if (typeof args.data.published === 'boolean') {
			post.published = args.data.published

			if (originalPost.published && !post.published) {
				pubsub.publish('post', {
					post: {
						mutation: 'DELETED',
						data: originalPost,
					},
				})
			} else if (!originalPost.published && post.published) {
				pubsub.publish('post', {
					post: {
						mutation: 'CREATED',
						data: post,
					},
				})
			} else if (post.published) {
				pubsub.publish('post', {
					post: {
						mutation: 'UPDATED',
						data: post,
					},
				})
			}
		}

		return post
	},
	createComment: (parent, args, { db, pubsub }, info) => {
		const userExists = db.users.some((user) => user.id === args.data.author)
		const postPublished = db.posts.some(
			(post) => post.id === args.data.post && post.published
		)

		if (!userExists || !postPublished) {
			throw new Error('Unable to find user or post')
		}

		const comment = {
			id: uuid(),
			...args.data,
		}

		db.comments.push(comment)
		pubsub.publish(`comment ${args.data.post}`, {
			comment: {
				mutation: 'CREATED',
				data: comment,
			},
		})
		return comment
	},
	deleteComment: (parent, args, { db, pubsub }, info) => {
		const commentIndex = db.comments.findIndex(
			(comment) => comment.id === args.id
		)

		if (commentIndex === -1) {
			throw new Error('Comment not found.')
		}

		db.comments = db.comments.filter((comment) => comment.post !== args.id)
		const [deletedComment] = db.comments.splice(commentIndex, 1)

		pubsub.publish(`comment ${deletedComment.post}`, {
			comment: {
				mutation: 'DELETED',
				data: deletedComment,
			},
		})
		return deletedComment
	},
	updateComment: (parent, args, { db, pubsub }, info) => {
		const comment = db.comments.find((comment) => comment.id === args.id)

		if (!comment) {
			throw new Error('Unable to find comment')
		}

		if (typeof args.data.text === 'string') {
			comment.text = args.data.text
		}

		pubsub.publish(`comment ${comment.post}`, {
			comment: {
				mutation: 'UPDATED',
				data: comment,
			},
		})

		return comment
	},
}
