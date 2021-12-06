import { Module } from '@nestjs/common';
import { BuildingSchema } from './building.schema';
import { BuildingsService } from './buildings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingController } from './building.controller';
import { BuildingsResolver } from './buildings.resolver';
import { RoomsModule } from 'src/rooms/rooms.module';
import { IncidentReportsModule } from 'src/incidentreports/incidentreport.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]), 
  RoomsModule, IncidentReportsModule],
  providers: [BuildingsService, BuildingController, BuildingsResolver],
  exports: [BuildingsService, BuildingController]
})
export class BuildingsModule {}
