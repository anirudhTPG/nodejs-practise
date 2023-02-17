"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Tracks_1 = __importDefault(require("../controllers/Tracks"));
const router = express_1.default.Router();
router.post('/create', Tracks_1.default.createTrack);
router.get('/get/:trackId', Tracks_1.default.readTrack);
router.get('/get', Tracks_1.default.readAll);
router.patch('/update/:trackId', Tracks_1.default.updateTrack);
router.delete('/delete/:trackId', Tracks_1.default.deleteTrack);
module.exports = router;
