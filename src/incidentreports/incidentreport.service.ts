import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomService } from '../rooms/rooms.service';
import { Building } from '../buildings/interfaces/building.interface';

@Injectable()
export class IncidentReportService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>,
    private roomService : RoomService) {};

    async getIncidentReportsFromRoom(buildingId, roomName) {
        const room = await this.roomService.getRoomByName(buildingId, roomName);
        return room.desks;
    }
}
