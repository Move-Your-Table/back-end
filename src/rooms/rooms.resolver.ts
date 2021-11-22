import { Resolver, Query } from '@nestjs/graphql';
import { BuildingsService } from '../buildings/buildings.service';
import { RoomType } from './dto/room.dto';

@Resolver(of => RoomType)
export class RoomsResolver {
    constructor(private readonly buildingService : BuildingsService) {};

    @Query(returns => [RoomType])
    async rooms(): Promise<RoomType[]> {
        const buildings = await this.buildingService.findAll("rooms");
        return buildings.reduce((a, b) => a.concat(b.rooms), new Array<RoomType>());
    }
}
