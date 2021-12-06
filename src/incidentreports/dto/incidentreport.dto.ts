import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class IncidentReportType {
  @Field()
  readonly user_id: number;
  @Field()
  readonly message: string;
}

@InputType()
export class incidentReportInput {
  @Field()
  readonly user_id: number;
  @Field()
  readonly message: string;
}
