import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class BuildingType {
  @Field(() => ID)
  readonly _id?: ObjectId;
  @Field()
  readonly name: string;
  @Field()
  readonly address: string;
}