import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingSchema } from '../buildings/building.schema';
import { IncidentReportService } from './incidentreport.service';
import { IncidentReportController } from './incidentreport.controller';


@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}])],
  providers: [IncidentReportController, IncidentReportService],
  exports: [IncidentReportController, IncidentReportService]
})
export class IncidentReportsModule {}
