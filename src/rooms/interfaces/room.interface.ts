import { Document } from 'mongoose';
import { IncidentReport } from '../../incidentreports/incidentreports.interface';
import { Desk } from "../../desks/interfaces/desks.interface"; 

export interface Room extends Document {
    readonly name: string,
    readonly type: string,
    readonly floor: number,
    readonly last_used: Date,
    readonly features: string
    readonly incidentReports: IncidentReport[];
    readonly desks : Desk[];
}