const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');
const Token = require('./auth-helpers.js');
const { validateUser } = require('../users/user-helpers.js');

const restricted = require('../auth/restriction.js');

router.post('/', restricted, (req, res) => {
	const user = req.body;

	const validateResult = validateUser(user);

	if (validateResult.isSuccessful === true) {
		const hash = bcrypt.hashSync(user.password, 10);
		user.password = hash;

		const token = Token.getJwt(user.username);

		Users.add(user)
			.then(saved => {
				res.status(201).json({ id: saved.id, username: saved.username, token: token });
			})
			.catch(error => {
				res.status(500).json(error);
			});
	} else {
		res.status(400).json({
			message: 'Invalid user info, see errors',
			errors: validateResult.errors
		});
	}
});

module.exports = router;
