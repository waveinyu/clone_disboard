const { Router, application } = require('express');
const roomRouter = Router();

const RoomController = require('../controllers/room.controller');
const roomController = new RoomController();

roomRouter.post('/', roomController.postRoom);
roomRouter.get('/', roomController.getRoom);
roomRouter.delete('/:roomId', roomController.deleteRoom);

module.exports = roomRouter;
