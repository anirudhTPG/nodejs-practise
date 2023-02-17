import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Logging from '../library/Logging';
import Tracks from '../models/Tracks';

const createTrack = (req: Request, res: Response, next: NextFunction) => {
    const { albumGenre, albumName, albumYear, artistName, trackName, trackPrice } = req.body;
    const track = new Tracks({
        _id: new mongoose.Types.ObjectId(),
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
            Logging.error(error);
            res.status(500).json({ error });
        });
};

const readTrack = (req: Request, res: Response, next: NextFunction) => {
    const trackId = req.params.trackId;
    return Tracks.findById(trackId)
        .then((track) => (track ? res.status(200).json({ track }) : res.status(400).json({ message: 'Not Found' })))
        .catch((error) => {
            Logging.error(error);
            res.status(500).json({ error });
        });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Tracks.find()
        .then((tracks) => res.status(200).json({ tracks }))
        .catch((error) => res.status(500).json({ error }));
};

const updateTrack = (req: Request, res: Response, next: NextFunction) => {
    const trackId = req.params.trackId;
    return Tracks.findById(trackId)
        .then((track) => {
            if (track) {
                track.set(req.body);

                return track
                    .save()
                    .then((tracks) => res.status(200).json({ tracks }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'track not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteTrack = (req: Request, res: Response, next: NextFunction) => {
    const trackId = req.params.trackId;
    return Tracks.findByIdAndDelete(trackId)
        .then((track) => (track ? res.status(201).json({ track, message: 'Track Deleted' }) : res.status(404).json({ message: 'track not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTrack, readTrack, readAll, updateTrack, deleteTrack };
