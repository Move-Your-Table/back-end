import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { RoomType } from '../rooms/dto/room.dto';
import { BuildingsService } from './buildings.service';
import { BuildingType } from './dto/building.dto';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService) {};
    
    @Query(returns => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingService.findAll();
    }

    @ResolveField(returns => [RoomType])
    room(): Promise<RoomType> {
        return this.room[0];
    }
}
