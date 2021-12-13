import { Controller } from "@nestjs/common";
import { IncidentReportService } from "./incidentreport.service";

@Controller()
export class IncidentReportController {
    constructor(private readonly incidentReportService: IncidentReportService) {}

    async getIncidentReportsFromRoom(buildingId, roomName) {
        return await this.incidentReportService.getIncidentReportsFromRoom(buildingId, roomName);
    }

    async getIncidentReportsFromDesk(buildingId, roomName, deskName) {
        return await this.incidentReportService.getIncidentReportsFromDesk(buildingId, roomName, deskName);
    }

    async addIncidentReportToRoom(buildingId, roomName, incidentReport) {
        return await this.incidentReportService.addIncidentReportToRoom(buildingId, roomName, incidentReport);
    }

    async addIncidentReportToDesk(buildingId, roomName, deskName, incidentReport) {
        return await this.incidentReportService.addIncidentReportToDesk(buildingId, roomName, deskName, incidentReport);
    }

    async removeIncidentReportFromRoom(buildingId, roomName, reportId) {
        return await this.incidentReportService.removeIncidentReportFromRoom(buildingId, roomName, reportId);
    }

    async removeIncidentReportFromDesk(buildingId, roomName, deskName, reportId) {
        return await this.incidentReportService.removeIncidentReportFromDesk(buildingId, roomName, deskName, reportId);
    }
}