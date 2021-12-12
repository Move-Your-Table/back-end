import { ObjectType, Field } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class BookingType {
  @Field()
  readonly _id : Types.ObjectId;
  @Field()
  readonly user_id: number;
  @Field()
  readonly start_time: Date;
  @Field()
  readonly end_time: Date;
  @Field()
  readonly public: boolean;
}
