import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomService } from '../rooms/rooms.service';
import { Building } from '../buildings/interfaces/building.interface';
import { ApolloError } from 'apollo-server-core';

@Injectable()
export class DesksService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>,
    private roomService : RoomService) {};

    async getDesksInRoom(buildingId, roomName) {
        const room = await this.roomService.getRoomByName(buildingId, roomName);
        return room.desks;
    }

    async getDeskInRoom(buildingId, roomName, deskName) {
        const desks = await this.getDesksInRoom(buildingId, roomName);
        return desks.find(desk => desk.name == deskName);
    }

    async addDeskToRoom(buildingId, roomName, desk) {
        if(await this.getDeskInRoom(buildingId, roomName, desk.name)) {
            throw new ApolloError("A desk with this name already exists.");
        }

        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);

        room.desks.push(desk);

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async editDeskInRoom(buildingId, roomName, deskName, editedDesk) {
        if(deskName != editedDesk.name &&
            await this.getDeskInRoom(buildingId, roomName, editedDesk.name)) {
            throw new ApolloError("A desk with this name already exists.");
        }
        
        return new Promise(async (resolve) => {
            const building = await this.buildingModel.findOne({_id: buildingId});
            const room = building.rooms.find(room => room.name == roomName);
            const deskIndex = room.desks.findIndex(desk => desk.name == deskName);

            room.desks[deskIndex] = editedDesk;

            building.save(err => {
                if(err) throw err;
                return resolve(true);
            });
        });
    }
    
    async deleteDeskInRoom(buildingId, roomName, deskName) {
        return new Promise(async (resolve) => {
            const building = await this.buildingModel.findOne({_id: buildingId});
            const room = building.rooms.find(room => room.name == roomName);
            const deskIndex = room.desks.findIndex(desk => desk.name == deskName);

            if(deskIndex != -1) {
                room.desks.splice(deskIndex, 1);

                building.save(err => {
                    if(err) throw err;
                    return resolve(true);
                }); 

                return resolve(true);
            } else {
                return resolve(false);
            }
          
        });
    }
}
