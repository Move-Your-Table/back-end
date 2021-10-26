import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

export const BuildingSchema = new Schema({
    _id: ObjectId,
    name: String,
    address: String
});