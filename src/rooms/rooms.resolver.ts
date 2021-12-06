import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { RoomService } from './rooms.service';
import { RoomType } from './dto/room.dto';
@Resolver(of => RoomType)
export class RoomsResolver {
    constructor(private readonly roomService : RoomService) {};
}
