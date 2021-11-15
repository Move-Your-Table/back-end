import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Room } from 'src/rooms/interfaces/room.interface';

export const BuildingSchema = new Schema({
    _id: ObjectId,
    name: String,
    address: String,
    rooms: Array<Room>()
});