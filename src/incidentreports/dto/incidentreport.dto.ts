import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class IncidentReportType {
  @Field()
  readonly user_id: number;
  @Field()
  readonly message: string;
}
