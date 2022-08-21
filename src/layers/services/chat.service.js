const ChatRepository = require('../repositories/chat.repository');
const { use } = require('../routers');
// const RoomRepository = require('../repositories/room.repository');

module.exports = class ChatService {
    chatRepository = new ChatRepository();
    // roomRepository = new RoomRepository();

    errResponse = (status, message) => {
        return { status, success: false, message };
    };

    createChat = async (roomId, userId, content) => {
        // const roomInfo = await this.roomRepository; // findOne(roomId) 메소드
        const roomInfo = {
            roomId: 1,
            roomName: 'EXTRA ROOM DATA',
            ownerUserId: 1,
        };
        if (!roomInfo) {
            return this.errResponse(400, '존재하지 않는 룸입니다.');
        } else if (!content) {
            return this.errResponse(400, '내용이 비어 있습니다.');
        }

        const chat = await this.chatRepository.createChat(roomId, userId, content);
        console.log(chat);
        return {
            status: 201,
            success: true,
        };
    };

    findRoomChat = async (roomId, userId) => {
        // const roomInfo = await this.roomRepository; // findOne(roomId) 메소드
        const roomInfo = {
            roomId: 1,
            roomName: 'EXTRA ROOM DATA',
            ownerUserId: 1,
        };
        if (!roomInfo) {
            return this.errResponse(400, '존재하지 않는 룸입니다.');
        }
        const ownerUserId = roomInfo.ownerUserId;
        const owner = ownerUserId === userId;
        console.log(ownerUserId, owner);

        const chatList = await this.chatRepository.findAllChat(roomId);
        console.log(chatList);
        const chatData = chatList.map((c) => {
            return {
                chatId: c.chatId,
                nickname: c.User.nickname,
                content: c.content,
                updatedAt: c.updatedAt,
            };
        });
        console.log(chatData);

        return {
            status: 200,
            success: true,
            data: { roomData: { ownerUserId, owner }, chatData },
        };
    };

    updateChat = async (chatId, userId, content) => {
        // const chatInfo = await this.chatRepository.findOneChat(chatId);
        const chatInfo = {
            chatId,
            userId: 1,
            content: '내용',
        };
        if (!chatInfo) {
            return this.errResponse(400, '존재하지 않는 채팅입니다.');
        }

        if (chatInfo.userId !== userId) {
            return this.errResponse(401, '작성자가 아닙니다.');
        }

        if (!content) {
            return this.errResponse(400, '내용이 비어 있습니다.');
        } else if (chatInfo.content === content) {
            return this.errResponse(400, '변경된 내용이 없습니다.');
        }

        await this.chatRepository.updateChat(chatId, content);
        return {
            status: 201,
            success: true,
        };
    };

    deleteChat = async (chatId, userId) => {
        // const chatInfo = await this.chatRepository.findOneChat(chatId);
        const chatInfo = {
            chatId,
            userId: 1,
            content: '내용',
        };
        if (!chatInfo) {
            return this.errResponse(400, '존재하지 않는 채팅입니다.');
        }

        if (chatInfo.userId !== userId) {
            return this.errResponse(401, '작성자가 아닙니다.');
        }

        await this.chatRepository.deleteChat(chatId);
        return {
            status: 200,
            success: true,
        };
    };
};
