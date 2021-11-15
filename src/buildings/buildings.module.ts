import { Module } from '@nestjs/common';
import { BuildingsResolver } from './buildings.resolver';
import { BuildingSchema } from './building.schema';
import { BuildingsService } from './buildings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]), RoomsModule],
  providers: [BuildingsService, BuildingsResolver]
})
export class BuildingsModule {}
