import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export const BookingSchema = new Schema({
    _id: ObjectId,
    user_id: Number,
    start_time: String,
    end_time: String,
    public: Boolean
});