"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("../library/Logging"));
const Cart_1 = __importDefault(require("../models/Cart"));
const createCart = (req, res, next) => {
    const { username, trackid, trackname, quantity, unitprice } = req.body;
    const cart = new Cart_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        trackid,
        trackname,
        quantity,
        unitprice
    });
    return cart
        .save()
        .then((cart) => res.status(201).json({ cart }))
        .catch((error) => {
        Logging_1.default.error(error);
        res.status(500).json({ error });
    });
};
const readCart = (req, res, next) => {
    //const username = req.params.username;
    return Cart_1.default.find({ username: req.params.username })
        .then((cart) => (cart ? res.status(200).json({ cart }) : res.status(400).json({ message: 'Not Found' })))
        .catch((error) => {
        Logging_1.default.error(error);
        res.status(500).json({ error });
    });
};
const updateCart = (req, res, next) => {
    const cartId = req.params.cartId;
    return Cart_1.default.findById(cartId)
        .then((cart) => {
        if (cart) {
            cart.set(req.body);
            return cart
                .save()
                .then((carts) => res.status(200).json({ carts }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'cart not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteCart = (req, res, next) => {
    const cartId = req.params.cartId;
    return Cart_1.default.findByIdAndDelete(cartId)
        .then((cart) => (cart ? res.status(201).json({ cart, message: 'Track Deleted' }) : res.status(404).json({ message: 'cart not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createCart, readCart, updateCart, deleteCart };
