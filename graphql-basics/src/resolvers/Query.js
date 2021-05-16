export const Query = {
	users: (parent, args, { db }, info) => {
		if (!args.query) {
			return db.users
		}

		return db.users.filter((user) =>
			user.name.toLowerCase().includes(args.query.toLowerCase())
		)
	},
	posts: (parent, args, { db }, info) => {
		if (!args.query) {
			return db.posts
		}

		return db.posts.filter(
			(post) =>
				post.title.toLowerCase().includes(args.query.toLowerCase()) ||
				post.body.toLowerCase().includes(args.query.toLowerCase())
		)
	},
	comments: (parent, args, { db }, info) => db.comments,
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
}
