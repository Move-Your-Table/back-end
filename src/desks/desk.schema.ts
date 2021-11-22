import { Schema } from 'mongoose';
import { IncidentReportSchema } from '../incidentreports/incidentreport.schema';

export const DeskSchema = new Schema({
    name: String,
    last_used: String,
    incidentReports: [IncidentReportSchema]
});