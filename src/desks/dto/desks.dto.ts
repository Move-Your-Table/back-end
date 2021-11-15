import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IncidentReportType } from 'src/incidentreports/dto/incidentreports.dto';

@ObjectType()
export class DeskType {
  @Field()
  readonly name: string;
  @Field()
  readonly last_used: string;
  @Field(type => [IncidentReportType])
  readonly incidentReports: IncidentReportType[]
}