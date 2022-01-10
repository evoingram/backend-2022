const db = require('../data/dbConfig');

const find = () => {
	return db('users').select('id', 'username', 'email');
};

const findBy = (filter) => {
	return db('users').where(filter);
};

async function add (user) {
	const [id] = await db('users').insert(user, 'id');
	return findById(id);
}

const findById = (id) => {
	return db('users')
		.select('id', 'username', 'email')
		.where({ id })
		.first();
};

const update = (id, user) => {
	return db('users')
		.where('id', Number(id))
		.update(user);
};

const remove = (id) => {
	return db('users')
		.where('id', Number(id))
		.del();
};

module.exports = {
	add,
	find,
	findBy,
	findById,
	update,
	remove
};
