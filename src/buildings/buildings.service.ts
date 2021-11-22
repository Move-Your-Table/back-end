import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Building } from './interfaces/building.interface';

@Injectable()
export class BuildingsService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>) {};

    async findAll(): Promise<Building[]> {
        return await this.buildingModel.find({}, {name: 1, address: 1}).exec();
    }

    async findOne(id: string): Promise<Building> {
        return await this.buildingModel.findOne({_id: id});
    }

    async createBuilding(name: string, address: string) {
        const id = new Types.ObjectId;
        return await this.buildingModel.create({"_id": id, "name": name, "address": address});
    }

    async updateBuilding(building: Building, name: string, address: string) {
        return await building.updateOne({"name": name, "address": address});
    }

}
