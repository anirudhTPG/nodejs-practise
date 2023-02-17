"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("../library/Logging"));
const Tracks_1 = __importDefault(require("../models/Tracks"));
const createTrack = (req, res, next) => {
    const { albumGenre, albumName, albumYear, artistName, trackName, trackPrice } = req.body;
    const track = new Tracks_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        albumGenre,
        albumName,
        albumYear,
        artistName,
        trackName,
        trackPrice
    });
    return track
        .save()
        .then((track) => res.status(201).json({ track }))
        .catch((error) => {
        Logging_1.default.error(error);
        res.status(500).json({ error });
    });
};
const readTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    return Tracks_1.default.findById(trackId)
        .then((track) => (track ? res.status(200).json({ track }) : res.status(400).json({ message: 'Not Found' })))
        .catch((error) => {
        Logging_1.default.error(error);
        res.status(500).json({ error });
    });
};
const readAll = (req, res, next) => {
    return Tracks_1.default.find()
        .then((tracks) => res.status(200).json({ tracks }))
        .catch((error) => res.status(500).json({ error }));
};
const updateTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    return Tracks_1.default.findById(trackId)
        .then((track) => {
        if (track) {
            track.set(req.body);
            return track
                .save()
                .then((tracks) => res.status(200).json({ tracks }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'track not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTrack = (req, res, next) => {
    const trackId = req.params.trackId;
    return Tracks_1.default.findByIdAndDelete(trackId)
        .then((track) => (track ? res.status(201).json({ track, message: 'Track Deleted' }) : res.status(404).json({ message: 'track not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createTrack, readTrack, readAll, updateTrack, deleteTrack };
