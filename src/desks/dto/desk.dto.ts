import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { BookingType } from 'src/bookings/dto/booking.dto';
import { IncidentReportType } from 'src/incidentreports/dto/incidentreport.dto';
@ObjectType()
export class DeskType {
  @Field()
  readonly name: string;
  @Field(type => [String])
  readonly features: string[];
  @Field(type => [IncidentReportType])
  readonly incidentReports : IncidentReportType[]
  @Field(type => [BookingType])
  readonly bookings : BookingType[]
}

@InputType()
export class DeskInput {
  @Field()
  readonly name: string;
  @Field(type => [String])
  readonly features: string[];
}