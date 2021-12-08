import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Role } from '../interfaces/user.interface';

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
  readonly role: Role;
}
