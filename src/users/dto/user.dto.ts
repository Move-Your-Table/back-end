import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly _id: ObjectId;
  @Field()
  readonly username: string;
  @Field()
  readonly email: string;
  @Field()
  readonly phonenumber: string;
  @Field()
  readonly role: string;
}
