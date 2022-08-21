'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                unique: true,
            },
            nickname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            birth: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    User.associate = function (models) {
        User.hasMany(models.Chat, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        User.hasMany(models.Room, {
            foreignKey: 'ownerUserId',
            sourceKey: 'userId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };
    return User;
};
