import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Role } from './interfaces/user.interface';

export const UserSchema = new Schema({
    _id: ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    phonenumber: String,
    company: String,
    role: String
});