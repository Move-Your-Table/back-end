import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Address } from './address.interface';
import { Room } from '../../rooms/interfaces/room.interface';

export interface Building extends Document {
    readonly _id: ObjectId,
    readonly name: string,
    readonly address: Address,
    readonly rooms: [Room]
}