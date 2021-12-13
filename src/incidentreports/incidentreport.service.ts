import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RoomService } from '../rooms/rooms.service';
import { Building } from '../buildings/interfaces/building.interface';
import { DesksService } from '../desks/desks.service';

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

    async addIncidentReportToRoom(buildingId, roomName, incidentReport) {
        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);
        room.incidentReports.push(incidentReport);

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async addIncidentReportToDesk(buildingId, roomName, deskName, incidentReport) {
        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);
        const desk = room.desks.find(desk => desk.name == deskName);

        desk.incidentReports.push(incidentReport);

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async removeIncidentReportFromRoom(buildingId, roomName, reportId) {
        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);

        const reportIndex = room.incidentReports.findIndex(report => report._id.toString() == reportId);
        if(reportIndex != -1) {
            room.incidentReports.splice(reportIndex);

            building.save(err => {
                if(err) throw err;
                return true;
            });

            return true;
        } else {
            return false;
        }
    }

    async removeIncidentReportFromDesk(buildingId, roomName, deskName, reportId) {
        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);
        const desk = room.desks.find(desk => desk.name == deskName);

        const reportIndex = desk.incidentReports.findIndex(report => report._id.toString() == reportId);

        if(reportIndex != -1) {
            desk.incidentReports.splice(reportIndex);

            building.save(err => {
                if(err) throw err;
                return true;
            });

            return true;
        } else {
            return false;
        }
    }
}
