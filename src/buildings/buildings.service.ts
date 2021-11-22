import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
