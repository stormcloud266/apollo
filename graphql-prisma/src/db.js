const users = [
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

const posts = [
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

const comments = [
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

export const db = {
	users,
	posts,
	comments,
}
