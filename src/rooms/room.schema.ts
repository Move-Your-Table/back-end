import { Schema } from 'mongoose';
import { IncidentReport } from '../incidentreports/interfaces/incidentreport.interface';
import { Desk } from '../desks/interfaces/desk.interface';

export const RoomSchema = new Schema({
    name: String,
    type: String,
    floor: Number,
    features: Array<String>(),
    incidentReports: Array<IncidentReport>(),
    desks: Array<Desk>()
});