import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Room } from '../rooms/interfaces/room.interface';
import { RoomType } from '../rooms/dto/room.dto';
import { RoomService } from '../rooms/rooms.service';
import { BuildingsService } from './buildings.service';
import { BuildingType } from './dto/building.dto';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService,
      private readonly roomService : RoomService) {};
    
    @Query(returns => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingService.findAll();
    }

    @Query(returns => BuildingType, {name: 'building'})
    async getBuilding(@Args('id', { type: () => String }) id: string) {
      return this.buildingService.findOne(id);
    }

    @ResolveField(returns => [RoomType])
    async rooms(@Parent() building : BuildingType,
    @Args('name', { type: () => String, nullable: true }) name?: string) : Promise<Room[]> {
        const buildingId = building._id;

        if(name) {
          const room = await this.roomService.getRoomByName(buildingId, name);
          return room ? [room] : new Array<Room>();
        } else {
          return this.roomService.getRooms(buildingId);
        }
    }
}
