import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomService } from '../rooms/rooms.service';
import { Building } from '../buildings/interfaces/building.interface';
import { DesksService } from 'src/desks/desks.service';

@Injectable()
export class IncidentReportService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>,
    private roomService : RoomService,
    private deskService : DesksService) {};

    async getIncidentReportsFromRoom(buildingId, roomName) {
        const room = await this.roomService.getRoomByName(buildingId, roomName);
        return room.incidentReports;
    }


    async getIncidentReportsFromDesk(buildingId, roomName, deskName) {
        const desk = await this.deskService.getDeskInRoom(buildingId, roomName, deskName);
        return desk.incidentReports;
    }


    
}
