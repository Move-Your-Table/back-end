import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export const IncidentReportSchema = new Schema({
    _id: ObjectId,
    user_id: Number,
    message: String
});