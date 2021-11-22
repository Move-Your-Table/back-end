import { Schema } from 'mongoose';
import { DeskSchema } from '../desks/desk.schema';
import { IncidentReportSchema } from '../incidentreports/incidentreport.schema';

export const RoomSchema = new Schema({
    name: String,
    type: String,
    floor: Number,
    features: Array<String>(),
    incidentReports: [IncidentReportSchema],
    desks: [DeskSchema]
});