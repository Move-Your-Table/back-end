import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building } from './interfaces/building.interface';
import { BuildingType } from './dto/building.dto';

@Injectable()
export class BuildingsService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>) {}

    async findAll(): Promise<BuildingType[]> {
        return await this.buildingModel.find().exec();
    }

    async findOne(id: string): Promise<BuildingType> {
        return await this.buildingModel.findOne({_id: id});
    }
}
