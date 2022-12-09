const jwt = require('jsonwebtoken');

class Token {
	static createToken = async (data) => {
		return await jwt.sign(data, process.env.TOKEN_KEY);
	};

	static verifyToken = async (token) => {
		if (!token) {
			return false;
		}

		try {
			return await jwt.verify(
				token,
				process.env.TOKEN_KEY,
				undefined,
				undefined
			);
		} catch (err) {
			return false;
		}
	};

	static routeControl = async (data) => {
		let { token, account_needed } = data;

		let response = true,
			responseStatus = '';


		if (account_needed) {
			return this.accountConnected(token);
		}

		return {
			response,
			responseStatus,
		};
	};

	static async accountConnected(token) {
		let control = await this.verifyToken(token);

		let response = true,
			responseStatus = '';

		if (!control.account) {
			response = false;
			responseStatus = 'Permesso negato.';
		}

		return {
			response,
			responseStatus,
			...control,
			token,
		};
	}

}

exports.Token = Token;
