import { Resolver, Query, Args } from '@nestjs/graphql';
import { BuildingsService } from './buildings.service';
import { BuildingType } from './dto/building.dto';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService) {};
    
    @Query(returns => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingService.findAll();
    }

    @Query(returns => BuildingType, {name: 'building'})
    async getBuilding(@Args('id', { type: () => String }) id: string) {
      return this.buildingService.findOne(id);
    }
}
