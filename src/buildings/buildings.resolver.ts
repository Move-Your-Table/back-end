import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Room } from '../rooms/interfaces/room.interface';
import { RoomType } from '../rooms/dto/room.dto';
import { RoomService } from '../rooms/rooms.service';
import { BuildingsService } from './buildings.service';
import { BuildingType, BuildingInput } from './dto/building.dto';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService,
      private readonly roomService : RoomService) {};
    
    @Query(() => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingService.findAll();
    }

    @Query(() => BuildingType, {name: 'building'})
    async getBuilding(@Args('id', { type: () => String }) id: string) {
      return this.buildingService.findOne(id);
    }


    @Mutation(() => BuildingType)
    async addBuilding(
      @Args('buildingInput') buildingInput: BuildingInput): Promise<BuildingType> {
        return this.buildingService.createBuilding(buildingInput.name, buildingInput.address);
    }

    @Mutation(() => BuildingType)
    async updateBuilding(
      @Args('id') id: string,
      @Args('buildingInput') buildingInput: BuildingInput): Promise<BuildingType> {
        let updatedBuilding = await this.buildingService.updateBuilding(id, buildingInput.name, buildingInput.address);
        if (updatedBuilding.acknowledged !== true) {
            return null;
        }
        return this.buildingService.findOne(id);
    }

    @Mutation(() => BuildingType)
    async deleteBuilding(
      @Args('id') id: string) {
        return await this.buildingService.deleteBuilding(id);
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
