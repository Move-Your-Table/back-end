import { Document } from 'mongoose';
import { IncidentReport } from '../../incidentreports/incidentreports.interface';

export interface Desk extends Document {
    readonly name: string,
    readonly last_used: string,
    incidentReports: IncidentReport[]
}