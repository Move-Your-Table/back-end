import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { RoomService } from './rooms.service';
import { RoomType } from './dto/room.dto';
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

}
