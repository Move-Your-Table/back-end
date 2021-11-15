import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
    name: String,
    type: String,
    floor: Number,
    features: Array<String>()
});