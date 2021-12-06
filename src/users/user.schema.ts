import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Role } from './interfaces/user.interface';

export const UserSchema = new Schema({
    _id: ObjectId,
    username: String,
    email: String,
    phonenumber: String,
    role: Role
});