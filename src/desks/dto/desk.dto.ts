import { ObjectType, Field } from '@nestjs/graphql';
import { BookingType } from 'src/bookings/dto/booking.dto';
import { IncidentReportType } from '../../incidentreports/dto/incidentreport.dto';

@ObjectType()
export class DeskType {
  @Field()
  readonly name: string;
  @Field()
  readonly last_used: string;
  @Field(type => [IncidentReportType])
  readonly incidentReports: IncidentReportType[]
  @Field(type => [BookingType])
  readonly bookings: BookingType[]
}