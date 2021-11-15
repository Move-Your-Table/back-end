import { Module } from '@nestjs/common';
import { RoomSchema } from './room.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsResolver } from './rooms.resolver';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Room', schema: RoomSchema}])],
  providers: [RoomsResolver],
})
export class RoomsModule {}
