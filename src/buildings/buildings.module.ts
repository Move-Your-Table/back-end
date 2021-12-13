import { Module } from '@nestjs/common';
import { BuildingSchema } from './building.schema';
import { BuildingsService } from './buildings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingController } from './building.controller';
import { BuildingsResolver } from './buildings.resolver';
import { RoomsModule } from '../rooms/rooms.module';
import { DesksModule } from '../desks/desks.module';
import { IncidentReportsModule } from '../incidentreports/incidentreport.module';
import { BookingsModule } from '../bookings/bookings.module';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]), 
  RoomsModule,
  DesksModule,
  IncidentReportsModule,
  BookingsModule],
  providers: [BuildingsService, BuildingController, BuildingsResolver],
  exports: [BuildingsService, BuildingController]
})
export class BuildingsModule {}
