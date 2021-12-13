import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { IncidentReportType } from '../../incidentreports/dto/incidentreport.dto';
import { DeskType } from '../../desks/dto/desk.dto';
import { Room } from '../interfaces/room.interface';

@ObjectType()
export class RoomType {
  @Field()
  readonly name: string;
  @Field()
  readonly type: string;
  @Field()
  readonly last_used: Date;
  @Field()
  readonly floor: number;
  @Field()
  readonly features: String;
  @Field(type => [DeskType])
  readonly desks: DeskType[];
  @Field(type => [IncidentReportType])
  readonly incidentReports : IncidentReportType[]
}


@InputType()
export class RoomInput {
  @Field()
  buildingId: string;
  @Field()
  room: Room;
}
