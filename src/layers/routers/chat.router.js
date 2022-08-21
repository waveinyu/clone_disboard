const express = require('express');
const chatRouter = express.Router();

const ChatController = require('../controllers/chat.controller');
const chatController = new ChatController();

// const auth = require('../middlewares/auth.middleware');

// http://localhost:3000/api/chat

chatRouter
    .route('/:roomId')
    .get(chatController.findRoomChatList)
    .post(chatController.createNewChat);
chatRouter.route('/:chatId').delete(chatController.deleteChat).put(chatController.updateChat);

module.exports = chatRouter;
