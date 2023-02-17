import mongoose, { Document, Schema } from 'mongoose';

export interface ITracks {
    trackName: String;
    artistName: String;
    albumName: String;
    albumYear: String;
    albumGenre: String;
    trackPrice: String;
}

export interface ITrackModel extends ITracks, Document {}

const tracksSchema: Schema = new Schema({
    trackName: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    albumYear: {
        type: String,
        required: true
    },
    albumGenre: {
        type: String,
        required: true
    },
    trackPrice: {
        type: String,
        required: true
    }
    // ,
    // {
    //     versionKey: false
    // }
});

export default mongoose.model<ITrackModel>('tracks', tracksSchema);
