import { IncidentReport } from "./incidentreport.interface";

export interface AddIncidentReportToDesk {
    readonly buildingId: string,
    readonly roomName: string,
    readonly deskName: string,
    readonly incidentReport: IncidentReport
}