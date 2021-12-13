import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class BookingType {
  @Field(() => ID)
  readonly _id : Types.ObjectId;
  @Field()
  readonly user_id: string;
  @Field()
  readonly start_time: string;
  @Field()
  readonly end_time: string;
  @Field()
  readonly public: boolean;
}

@InputType()
export class BookingInput {
  @Field()
  readonly user_id: string;
  @Field()
  readonly start_time: string;
  @Field()
  readonly end_time: string;
  @Field()
  readonly public: boolean;
}
