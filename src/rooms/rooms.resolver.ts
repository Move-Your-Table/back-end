import { Resolver, ResolveField, Parent, Args, Mutation } from '@nestjs/graphql';
import { RoomService } from './rooms.service';
import { RoomType } from './dto/room.dto';
import { DeskType } from '../desks/dto/desk.dto';
import { DesksService } from 'src/desks/desks.service';

@Resolver(of => RoomType)
export class RoomsResolver {
    constructor(private readonly roomService : RoomService,
        private readonly deskService : DesksService) {};

    @ResolveField(returns => Number)
    async deskCount(@Parent() room : RoomType) : Promise<number> {
        return room.desks.length;
    }

    @ResolveField(returns => Array<DeskType>())
    desks(@Parent() room : RoomType,
    @Args('name', { type: () => String, nullable: true }) name?: string) : Array<DeskType> {

        if(name) {
            return room.desks.filter(desk => desk.name == name);
        } else {
          return room.desks;
        }
    }

    @Mutation(() => DeskType)
        async addDeskToRoom(
          @Args('buildingId') buildingId: string,
          @Args('roomName') roomName: string,
          @Args('deskName') deskName: string): Promise<DeskType> {
            const newDesk = { 
              name: deskName, 
              incidentReports: [],
              bookings: [],
            };
      
            await this.deskService.addDeskToRoom(buildingId, roomName, newDesk);
            return newDesk;
        }


    @Mutation(() => DeskType)
    async updateDesk(
        @Args('buildingId') buildingId: string,
        @Args('roomName') roomName: string,
        @Args('deskName') deskName: string,
        @Args('newDeskName') newDeskName: string): Promise<DeskType> {

        let desk = await this.deskService.getDeskInRoom(buildingId, roomName, deskName);

        const updatedDesk = { 
            name: newDeskName, 
            incidentReports: desk.incidentReports,
            bookings: desk.bookings,

        };
    
        if (await this.deskService.editDeskInRoom(buildingId, roomName, deskName, updatedDesk)) {
            return updatedDesk;
        }
    }

    @Mutation(() => DeskType)
    async removeDesk (
        @Args('buildingId') buildingId: string,
        @Args('roomName') roomName: string,
        @Args('deskName') deskName: string): Promise<DeskType> {

        let desk = await this.deskService.getDeskInRoom(buildingId, roomName, deskName);

        if (await this.deskService.deleteDeskInRoom(buildingId, roomName, deskName)) {
            return desk;
        }
    }
}
