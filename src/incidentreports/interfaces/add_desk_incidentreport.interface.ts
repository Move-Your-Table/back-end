import { IncidentReport } from "./incidentreport.interface";

export interface AddIncidentReportToRoom {
    readonly buildingId: string,
    readonly roomName: string,
    readonly deskName: string,
    readonly incidentReport: IncidentReport
}