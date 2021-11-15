import { Schema } from 'mongoose';
import { IncidentReport } from '../incidentreports/incidentreports.interface';
import { Desk } from '../desks/interfaces/desks.interface';

export const RoomSchema = new Schema({
    name: String,
    type: String,
    floor: Number,
    features: Array<String>(),
    incidentReports: Array<IncidentReport>(),
    desks: Array<Desk>()
});