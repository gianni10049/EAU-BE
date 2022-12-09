const { Token } = require('../controllers/Token');

const generic_query = {
	routeControl: async (tokenData, data = {}) => {
		data.tokenData = tokenData;
		return await Token.routeControl(data);
	},
};

exports.generic_query = generic_query;