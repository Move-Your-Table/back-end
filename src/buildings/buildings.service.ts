import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BuildingUpdateInput } from './dto/building.dto';
import { Address } from './interfaces/address.interface';
import { Building } from './interfaces/building.interface';

@Injectable()
export class BuildingsService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>) {};

    async findAll(): Promise<Building[]> {
        return await this.buildingModel.find({}, {name: 1, address: 1}).exec();
    }

    async findOne(id: string, projection: string = null): Promise<Building> {
        return await this.buildingModel.findOne({_id: id}, projection);
    }

    async findOneByName(buildingName, projection) {
        return await this.buildingModel.findOne({name: buildingName}, projection);
    }

    async addRoom(buildingId, room) {
        const building = await this.findOne(buildingId);
        building.rooms.push(room);

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async updateRoom(buildingId, updateRoom) {
        const building = await this.findOne(buildingId);
        const roomIndex = building.rooms.findIndex(room => room.name == updateRoom.name);
        
        building.rooms[roomIndex] = updateRoom;
    
        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async deleteRoom(buildingId, roomName) {
        const building = await this.findOne(buildingId);
        const roomIndex = building.rooms.findIndex(room => room.name == roomName);
        
        building.rooms.splice(roomIndex);
    
        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async createBuilding(name: string, address: Address) {
        if(await this.findOneByName(name, "_id")) {
            throw "A building with this name already exists";
        }

        const id = new Types.ObjectId;
        return await this.buildingModel.create({"_id": id, "name": name, "address": address});
    }

    async updateBuilding(buildingId: string, updateInput : BuildingUpdateInput) {
        const building = await this.findOne(buildingId);

        if(building.name != updateInput.name && 
            await this.findOneByName(updateInput.name, "_id")) {
            throw "A building with this name already exists";
        }

        const updatedBuilding = {
            _id: building.id,
            name: updateInput.name ? updateInput.name : building.name,
            address: updateInput.address ? {
                country: updateInput.address.country ? updateInput.address.country : updateInput.address.country,
                postalcode: updateInput.address.postalcode ? updateInput.address.postalcode : updateInput.address.postalcode,
                city: updateInput.address.city ? updateInput.address.city : updateInput.address.city,
                street: updateInput.address.street ? updateInput.address.street : updateInput.address.street,
            } : building.address
        }

        return await building.updateOne({"name": updatedBuilding.name, 
        "address": updatedBuilding.address});
    }

    async deleteBuilding(buildingId: string) {
        const building = await this.findOne(buildingId);
        return await building.deleteOne({});
    }
}
