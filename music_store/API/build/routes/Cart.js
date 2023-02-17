"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Cart_1 = __importDefault(require("../controllers/Cart"));
const router = express_1.default.Router();
router.post('/create', Cart_1.default.createCart);
router.get('/get/:username', Cart_1.default.readCart);
router.patch('/update/:username', Cart_1.default.updateCart);
router.delete('/delete/:username', Cart_1.default.deleteCart);
module.exports = router;
