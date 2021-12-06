import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingSchema } from '../buildings/building.schema';
import { IncidentReportService } from './incidentreport.service';
import { IncidentReportController } from './incidentreport.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { DesksModule } from 'src/desks/desks.module';


@Module({
    imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
            RoomsModule, DesksModule],
  providers: [IncidentReportController, IncidentReportService],
  exports: [IncidentReportController, IncidentReportService]
})
export class IncidentReportsModule {}
