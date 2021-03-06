import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApolloError } from 'apollo-server-core';
import { Model } from 'mongoose';
import { Building } from '../buildings/interfaces/building.interface';

@Injectable()
export class RoomService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>) {};

    async getRooms(buildingId) {
        const building = await this.buildingModel.findOne({_id: buildingId}, "rooms");
        return building.rooms;
    }

    async getRoomByName(buildingId, roomName) {
        const rooms = await this.getRooms(buildingId);
        return rooms.find(room => room.name == roomName);
    }

    async addRoom(buildingId, room) {
        if(await this.getRoomByName(buildingId, room.name)) {
            throw new ApolloError("A room with this name already exists.");
        }

        const building = await this.buildingModel.findOne({_id: buildingId});
        building.rooms.push(room);
    
        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async updateRoom(buildingId, roomName, updateRoom) {
        if(updateRoom.name != roomName &&
            await this.getRoomByName(buildingId, updateRoom.name)) {
            throw new ApolloError("A room with this name already exists.");
        }

        const building = await this.buildingModel.findOne({_id: buildingId});
        const roomIndex = building.rooms.findIndex(room => room.name == roomName);
        
        building.rooms[roomIndex] = updateRoom;
    
        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async deleteRoom(buildingId, roomName) {
        return new Promise(async (resolve) => {
            const building = await this.buildingModel.findOne({_id: buildingId});
            const roomIndex = building.rooms.findIndex(room => room.name == roomName);
        
            building.rooms.splice(roomIndex);
        
            building.save(err => {
                if(err) throw err;
                return resolve(true);
            });           
        });

    }
}
