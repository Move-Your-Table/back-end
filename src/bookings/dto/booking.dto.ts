import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType()
export class BookingType {
  @Field(() => ID)
  readonly _id : ObjectId;
  @Field()
  readonly user_id: String;
  @Field()
  readonly start_time: string;
  @Field()
  readonly end_time: string;
  @Field()
  readonly public: boolean;
}
