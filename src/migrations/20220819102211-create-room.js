'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Rooms', {
            roomId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            ownerUserId: {
                foreignKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            roomName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
            },
            lastChat: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Rooms');
    },
};
