import { ObjectType, Field } from '@nestjs/graphql';

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
}