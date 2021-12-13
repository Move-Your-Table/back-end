import { Schema, Types } from 'mongoose';

export const BookingSchema = new Schema({
    _id: Types.ObjectId,
    user_id: String,
    start_time: Schema.Types.Date,
    end_time: Schema.Types.Date,
    public: Boolean
});