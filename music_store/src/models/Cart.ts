import mongoose, { Document, Schema } from 'mongoose';

export interface ICart {
    username: String;
    trackid: String;
    trackname: String;
    quantity: String;
    unitprice: String;
}

export interface ICartModel extends ICart, Document {}

const cartSchema: Schema = new Schema({
    username: { type: String, require: true },
    trackid: { type: String, require: true },
    trackname: { type: String, require: true },
    quantity: { type: String, require: true },
    unitprice: { type: String, require: true }
});

export default mongoose.model<ICartModel>('userCart', cartSchema);
