const RoomRepository = require("../repositories/room.repository");

class RoomService {
    roomRepository;

    constructor() {
        this.roomRepository = new RoomRepository();
    }

    errResponse = (status, message) => {
        return { status, success: false, message };
    };

    postRoom = async (ownerUserId, roomName, content, category) => {
        return await this.roomRepository.postRoom(ownerUserId, roomName, content, category);
    };

    getRoom = async () => {
        return await this.roomRepository.getRoom();
    };

    getCategoryRoom = async (category) => {
        const getCategoryRoom = await this.roomRepository.getCategoryRoom(category);
        if (!getCategoryRoom) return this.errResponse(401, "알 수 없는 에러");

        return { status: 200, success: true, result: getCategoryRoom };
    };

    deleteRoom = async (roomId, ownerUserId) => {
        const roomInfo = await this.roomRepository.getOneRoom(roomId);
        if (!roomInfo) return this.errResponse(400, "존재하지 않는 룸입니다.");
        if (roomInfo.ownerUserId !== ownerUserId) return this.errResponse(401, "방장이 아닙니다.");

        const deleteRoom = await this.roomRepository.deleteRoom(roomId);
        if (!deleteRoom) return this.errResponse(401, "알 수 없는 에러");

        return { status: 200, success: true, result: {} };
    };
}
module.exports = RoomService;
