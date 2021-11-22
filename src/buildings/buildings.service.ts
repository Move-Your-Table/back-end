import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './interfaces/building.interface';

@Injectable()
export class BuildingsService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>) {};

    async findAll(): Promise<Building[]> {
        return await this.buildingModel.find().exec();
    }

    async findOne(id: string, projection: string = null): Promise<Building> {
        return await this.buildingModel.findOne({_id: id}, projection);
    }

    async addRoom(buildingId, room) {
        const building = await this.findOne(buildingId);
        building.rooms.push(room);

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }
}
