const express = require('express');
const router = express.Router();

const Test = require('./test');
const test = new Test();

router.route('/user').post(test.createUser).delete(test.deleteUser);
router.route('/room').post(test.createRoom).delete(test.deleteRoom);
router.route('/chat').post(test.createChat).delete(test.deleteChat);

router.get('/', test.getAll);

module.exports = router;
