import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from 'src/rooms/rooms.module';
import { BuildingSchema } from '../buildings/building.schema';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
            RoomsModule],
  providers: [DesksService, DesksController],
  exports: [DesksController, DesksService]
})
export class DesksModule {}
