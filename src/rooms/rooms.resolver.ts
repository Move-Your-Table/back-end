import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { RoomType } from './dto/room.dto';

@Resolver(of => RoomType)
export class RoomsResolver {
    constructor() {};
}
