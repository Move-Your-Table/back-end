import { Controller } from "@nestjs/common";
import { IncidentReportService } from "./incidentreport.service";

@Controller()
export class IncidentReportController {
    constructor(private readonly incidentReportService: IncidentReportService) {}

    async getIncidentReportsFromRoom(buildingId, roomName) {
        return await this.incidentReportService.getIncidentReportsFromRoom(buildingId, roomName);
    }
}