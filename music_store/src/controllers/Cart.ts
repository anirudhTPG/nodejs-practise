import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import Cart from '../models/Cart';

const createCart = (req: Request, res: Response, next: NextFunction) => {
    const { username, trackid, trackname, quantity, unitprice } = req.body;
    const cart = new Cart({
        _id: new mongoose.Types.ObjectId(),
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
            Logging.error(error);
            res.status(500).json({ error });
        });
};

const readCart = (req: Request, res: Response, next: NextFunction) => {
    //const username = req.params.username;
    return Cart.find({ username: req.params.username })
        .then((cart) => (cart ? res.status(200).json({ cart }) : res.status(400).json({ message: 'Not Found' })))
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({ error });
        });
};

const updateCart = (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.params.cartId;
    return Cart.findById(cartId)
        .then((cart) => {
            if (cart) {
                cart.set(req.body);

                return cart
                    .save()
                    .then((carts) => res.status(200).json({ carts }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'cart not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCart = (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.params.cartId;
    return Cart.findByIdAndDelete(cartId)
        .then((cart) => (cart ? res.status(201).json({ cart, message: 'Track Deleted' }) : res.status(404).json({ message: 'cart not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCart, readCart, updateCart, deleteCart };
