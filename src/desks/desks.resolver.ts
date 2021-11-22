import { Resolver, Query } from '@nestjs/graphql';
import { BuildingsService } from '../buildings/buildings.service';
import { RoomType } from '../rooms/dto/room.dto';
import { DeskType } from './dto/desk.dto';

@Resolver(of => DeskType)
export class DesksResolver {
    constructor(private readonly buildingService : BuildingsService) {};

    @Query(returns => [DeskType])
    async desks(): Promise<DeskType[]> {
        const buildings = await this.buildingService.findAll("rooms.desks");
        const rooms = buildings.reduce((a, b) => a.concat(b.rooms), new Array<RoomType>());
        return rooms.reduce((a, b) => a.concat(b.desks), new Array<DeskType>());
    }
}
