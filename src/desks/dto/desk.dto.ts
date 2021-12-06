import { ObjectType, Field } from '@nestjs/graphql';
import { IncidentReportType } from 'src/incidentreports/dto/incidentreport.dto';
@ObjectType()
export class DeskType {
  @Field()
  readonly name: string;
  @Field(type => [IncidentReportType])
  readonly incidentReports : IncidentReportType[]
}
