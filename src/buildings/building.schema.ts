import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Room } from '../rooms/interfaces/room.interface';
import { IncidentReport } from '../incidentreports/incidentreports.interface';

export const BuildingSchema = new Schema({
    _id: ObjectId,
    name: String,
    address: String,
    incidentReports: Array<IncidentReport>(),
    rooms: Array<Room>()
});