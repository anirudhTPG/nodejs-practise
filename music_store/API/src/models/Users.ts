import mongoose, { Schema } from 'mongoose';

export interface IUsers{
    username: String,
    password: String,
    role: String
}

export interface IUserModel extends IUsers, Document{}

const userSchema:Schema =new Schema({
    username:{ type: String,required: true },
    password:{ type: String,required: true },
    role: { type: String, require: true}
});

export default mongoose.model<IUserModel>('users', userSchema);

