import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookingType {
  @Field()
  readonly _id : string;
  @Field()
  readonly user_id: number;
  @Field()
  readonly start_time: Date;
  @Field()
  readonly end_time: Date;
  @Field()
  readonly public: boolean;
}
