import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingSchema } from '../buildings/building.schema';
import { RoomsController } from './rooms.controller';
import { RoomsResolver } from './rooms.resolver';
import { RoomService } from './rooms.service';
import { DesksService } from '../desks/desks.service';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}])],
  providers: [RoomsController, RoomService, RoomsResolver, DesksService],
  exports: [RoomsController, RoomService, DesksService]
})
export class RoomsModule {}
