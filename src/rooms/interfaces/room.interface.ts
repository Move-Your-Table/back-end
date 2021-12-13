import { IncidentReport } from '../../incidentreports/interfaces/incidentreport.interface';
import { Desk } from "../../desks/interfaces/desk.interface"; 

export interface Room {
    readonly name: string,
    readonly type: string,
    readonly floor: number,
    readonly features: string[]
    readonly incidentReports: IncidentReport[];
    readonly desks : Desk[];
}