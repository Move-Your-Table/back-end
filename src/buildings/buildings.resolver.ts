import { Resolver, Query } from '@nestjs/graphql';
import { BuildingsService } from './buildings.service';
import { BuildingType } from './dto/building.dto';
import { Building } from './interfaces/building.interface';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService) {};
    
    @Query(returns => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingService.findAll();
    }
}
