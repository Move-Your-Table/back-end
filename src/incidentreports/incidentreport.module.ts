import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncidentReportService } from './incidentreport.service';
import { IncidentReportController } from './incidentreport.controller';
import { RoomsModule } from 'src/rooms/rooms.module';
import { DesksModule } from 'src/desks/desks.module';
import { IncidentReportResolver } from './incidentreport.resolver';
import { BuildingSchema } from '../buildings/building.schema';
import { UsersModule } from '../users/users.module';


@Module({
    imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
            RoomsModule, DesksModule, UsersModule],
  providers: [IncidentReportController, IncidentReportService, IncidentReportResolver],
  exports: [IncidentReportController, IncidentReportService]
})
export class IncidentReportsModule {}
