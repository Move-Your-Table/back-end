import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { RoomSchema } from '../rooms/room.schema';
import { AddressSchema } from './address.schema';

export const BuildingSchema = new Schema({
    _id: ObjectId,
    name: String,
    address: AddressSchema,
    rooms: [RoomSchema]
});