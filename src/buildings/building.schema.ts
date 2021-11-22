import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Room } from '../rooms/interfaces/room.interface';
import { IncidentReport } from '../incidentreports/interfaces/incidentreport.interface';

export const BuildingSchema = new Schema({
    _id: ObjectId,
    name: String,
    address: String,
    incidentReports: Array<IncidentReport>(),
    rooms: Array<Room>()
});