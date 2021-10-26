import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface Building extends Document {
    readonly _id: ObjectId,
    readonly name: string,
    readonly address: string
}