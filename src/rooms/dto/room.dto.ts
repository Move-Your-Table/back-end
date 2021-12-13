import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IncidentReportType } from '../../incidentreports/dto/incidentreport.dto';
import { DeskType } from '../../desks/dto/desk.dto';

@ObjectType()
export class RoomType {
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;
  @Field()
  readonly floor: number;
  @Field(type => [String])
  readonly features: string[];
  @Field(type => [DeskType])
  readonly desks: DeskType[];
  @Field(type => [IncidentReportType])
  readonly incidentReports : IncidentReportType[]
}

@InputType()
export class RoomInput {
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;
  @Field()
  readonly floor: number;
  @Field(type => [String])
  readonly features: string[];
}
