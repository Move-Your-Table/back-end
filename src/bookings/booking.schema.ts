import { Schema } from 'mongoose';

export const BookingSchema = new Schema({
    user_id: Number,
    start_time: String,
    end_time: String,
    public: Boolean
});