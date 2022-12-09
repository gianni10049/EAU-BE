const dotenv = require('dotenv');
try {
	dotenv.config();
} catch (e) {
	console.log('missing env file', e);
}

module.exports = {
	'development': {
		'username': process.env.MYSQL_USER,
		'password': process.env.MYSQL_PASS,
		'database': process.env.MYSQL_DB,
		'host': process.env.MYSQL_HOST,
		'dialect': 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
	'test': {
		'username': 'root',
		'password': null,
		'database': 'database_test',
		'host': '127.0.0.1',
		'dialect': 'mysql',
	},
	'production': {
		'username': 'root',
		'password': null,
		'database': 'database_production',
		'host': '127.0.0.1',
		'dialect': 'mysql',
	},
};
