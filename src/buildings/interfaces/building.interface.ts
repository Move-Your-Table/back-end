import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Room } from '../../rooms/interfaces/room.interface';

export interface Building extends Document {
    readonly _id: ObjectId,
    readonly name: string,
    readonly address: string,
    readonly rooms: [Room]
}