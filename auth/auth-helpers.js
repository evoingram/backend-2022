const jwt = require('jsonwebtoken');

const getJwt = (username) => {
	const payload = username;
	const secret = process.env.JWT_SECRET;

	const options = {
		expiresIn: '1d'
	};

	return jwt.sign(payload, secret, options);
};

module.exports = getJwt;
