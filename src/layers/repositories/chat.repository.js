const { Chat } = require('../../models');

module.exports = class ChatRepository {
    createChat = async (roomId, userId, content) => {
        const chat = await Chat.create({ roomId, userId, content });
        return chat;
    };

    findAllChat = async (roomId) => {
        const list = await Chat.findAll({
            where: { roomId },
            include: [
                {
                    model: User,
                    attributes: ['nickname'],
                },
            ],
            raw: true,
        });
        return list;
    };

    findOneChat = async (chatId) => {
        const chat = await Chat.findOne({ where: { chatId } });
        return chat;
    };

    updateChat = async (chatId, content) => {
        const success = await Chat.update({ content }, { where: chatId });
        return console.log(success);
    };

    deleteChat = async (chatId) => {
        const success = await Chat.destroy({ where: { chatId } });
        return console.log(success);
    };
};
