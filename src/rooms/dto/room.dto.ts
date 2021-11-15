import { ObjectType, Field } from '@nestjs/graphql';
import { IncidentReportType } from 'src/incidentreports/dto/incidentreport.dto';
import { DeskType } from '../../desks/dto/desk.dto';

@ObjectType()
export class RoomType {
  @Field()
  readonly name: string;
  @Field()
  readonly last_used: Date;
  @Field()
  readonly floor: number;
  @Field()
  readonly features: String;
  @Field(type => [IncidentReportType])
  readonly incidentReports: IncidentReportType[];
  @Field(type => [DeskType])
  readonly desks: DeskType[];
}