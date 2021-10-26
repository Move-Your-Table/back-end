import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface Building extends Document {
    readonly _id: ObjectId,
    readonly name: String,
    readonly address: String
}