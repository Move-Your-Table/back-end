import { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { RoomSchema } from '../rooms/room.schema';
import { IncidentReportSchema } from '../incidentreports/incidentreport.schema';

export const BuildingSchema = new Schema({
    _id: ObjectId,
    name: String,
    address: String,
    incidentReports: [IncidentReportSchema],
    rooms: [RoomSchema]
});