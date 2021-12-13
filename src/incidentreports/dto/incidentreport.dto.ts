import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class IncidentReportType {
  @Field(() => ID)
  readonly _id: Types.ObjectId;
  @Field()
  readonly user_id: string;
  @Field()
  readonly message: string;
}

@InputType()
export class incidentReportInput {
  @Field()
  readonly user_id: string;
  @Field()
  readonly message: string;
}
