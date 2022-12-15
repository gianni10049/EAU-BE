'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('user', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				allowNull: false,
				type: Sequelize.STRING
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING
			},
			salt: {
				allowNull: false,
				type: Sequelize.STRING
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			active: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				default: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
				default: null
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('user');
	}
};
