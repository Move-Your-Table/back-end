import { Resolver, ResolveField, Parent, Args, Mutation } from '@nestjs/graphql';
import { RoomService } from './rooms.service';
import { RoomInput, RoomType } from './dto/room.dto';
import { DeskType } from '../desks/dto/desk.dto';

@Resolver(of => RoomType)
export class RoomsResolver {
    constructor(private readonly roomService : RoomService) {};

    @ResolveField(returns => Array<DeskType>())
    desks(@Parent() room : RoomType,
    @Args('name', { type: () => String, nullable: true }) name?: string) : Array<DeskType> {

        if(name) {
            return room.desks.filter(desk => desk.name == name);
        } else {
          return room.desks;
        }
    }


    @Mutation(() => RoomType)
    async addRoom(
      @Args('roomInput') roomInput: RoomInput): Promise<RoomType> {
        if (this.roomService.addRoom(roomInput.buildingId, roomInput.room)) {
            return this.roomService.getRoomByName(roomInput.buildingId, roomInput.room.name);
        }
        return null;
    }

}
