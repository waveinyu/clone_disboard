const { RoboMaker } = require('aws-sdk');
const express = require('express');
const joi = require('joi');

const RoomService = require('../services/room.service');

class RoomController {
    roomService;

    constructor() {
        this.roomService = new RoomService();
    }

    postRoom = async (req, res, next) => {
        const ownerUserId = 1;
        const { roomName, category } = req.body;
        console.log({ roomName, category });
        try {
            await joi
                .object({
                    ownerUserId: joi.number().required(),
                    roomName: joi.string().required(),
                    category: joi.string(),
                })
                .validateAsync({ ownerUserId, roomName, category });

            const result = await this.roomService.postRoom(roomName, category, ownerUserId);
            return res.status(201).json({ status: 200, success: true, result: result });
        } catch (err) {
            console.log(err);
            return res
                .status(400)
                .json({ status: 400, success: false, message: '입력한 형식이 맞지 않습니다.' });
            throw err;
        }
    };

    getRoom = async (req, res, next) => {
        const category = req.query.category;
        try {
            if (category === '') {
                const getAllRoom = await this.roomService.getRoom();
                return res.status(200).json({ status: 200, success: true, result: getAllRoom });
            } else {
                const getCategoryRoom = await this.roomService.getCategoryRoom(category);
                return res
                    .status(200)
                    .json({ status: 200, success: true, result: getCategoryRoom });
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    deleteRoom = async (req, res, next) => {
        const roomId = req.params.roomId;
        console.log(roomId);
        const result = await this.roomService.deleteRoom(roomId);
        return res.status(200).json({ status: 200, success: true, result: {} });
    };
}

module.exports = RoomController;
