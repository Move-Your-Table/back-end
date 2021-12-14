import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Role } from '../interfaces/user.interface';

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly _id: ObjectId;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly phonenumber: string;
  @Field()
  readonly company: string;
  @Field()
  readonly role: Role;
}
