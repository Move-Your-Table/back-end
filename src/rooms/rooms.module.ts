import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingSchema } from '../buildings/building.schema';
import { RoomsController } from './rooms.controller';
import { RoomService } from './rooms.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}])],
  providers: [RoomsController, RoomService],
  exports: [RoomsController]
})
export class RoomsModule {}
