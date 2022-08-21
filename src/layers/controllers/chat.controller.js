const { response } = require('express');
const ChatService = require('../services/chat.service');

module.exports = class ChatController {
    chatService = new ChatService();

    sendResponse = (res, status, success, extra) => {
        console.log(status, success);
        console.log(extra ? true : false, extra);
        if (extra && success) {
            return res.status(status).json({ success, data: extra });
        } else if (extra) {
            return res.status(status).json({ success, message: extra });
        } else {
            return res.status(status).json({ success });
        }
    };

    createNewChat = async (req, res) => {
        const { roomId } = req.params;
        // const { userId } = res.locals;
        const userId = 1;
        const { content } = req.body;

        const response = await this.chatService.createChat(roomId, userId, content);
        console.log(response);
        const r = response;
        console.log(r);
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };

    findRoomChatList = async (req, res) => {
        const { roomId } = req.params;
        // const { userId } = res.locals;
        const userId = 1;

        const response = await this.chatService.findRoomChat(roomId, userId);
        console.log(response);
        const r = response;
        console.log(r);
        return this.sendResponse(res, r.status, r.success, r.success ? r.data : r.message);
    };

    updateChat = async (req, res) => {
        // const { userId } = res.locals;
        const userId = 1;
        const chatId = req.params;
        const { content } = req.body;

        const response = await this.chatService.updateChat(chatId, userId, content);
        console.log(response);
        const r = response;
        console.log(r);
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };

    deleteChat = async (req, res) => {
        // const { userId } = res.locals;
        const userId = 1;
        const chatId = req.params;
        const { content } = req.body;

        const response = await this.chatService.deleteChat(chatId, userId);
        console.log(response);
        const r = response;
        console.log(r);
        return this.sendResponse(res, r.status, r.success, r.success ? null : r.message);
    };
};
