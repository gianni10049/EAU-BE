'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    User.init({
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        salt: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        sequelize,
        tableName: 'user',
        modelName: 'User',
    });
    return User;
};
