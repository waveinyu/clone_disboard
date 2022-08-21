const express = require('express');
const router = express.Router();
const app = express();

// const userRouter = require('./user.router');
const roomRouter = require('./room.router');
const chatRouter = require('./chat.router');

// router.use('/user', userRouter);
router.use('/room', roomRouter);
router.use('/chat', chatRouter);

module.exports = router;
