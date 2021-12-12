import { Schema, Types } from 'mongoose';

export const BookingSchema = new Schema({
    _id: Types.ObjectId,
    user_id: String,
    start_time: String,
    end_time: String,
    public: Boolean
});