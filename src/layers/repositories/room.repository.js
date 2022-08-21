const { Room, User } = require('../../models');

console.log('모델 불러와!');

class RoomRepository {
    constructor() {}

    postRoom = async (roomName, category, ownerUserId) => {
        try {
            const room = await Room.create({ roomName, category, ownerUserId });
            return room;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    getRoom = async () => {
        try {
            const allRoom = await Room.findAll({
                attributes: ['roomId', 'roomName', 'category'],
                order: [['updatedAt', 'DESC']],
            });

            return allRoom;
        } catch (err) {
            throw err;
        }
    };

    getCategoryRoom = async (category) => {
        try {
            const getCategoryRoom = await Room.findAll({
                where: { category },
                order: [['updatedAt', 'DESC']],
                attributes: ['roomId', 'roomName', 'category'],
            });
            return getCategoryRoom;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    deleteRoom = async (roomId) => {
        try {
            const deleteRoom = await Room.destroy({
                where: { roomId },
            });
            return deleteRoom;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
}

module.exports = RoomRepository;
