import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookingType {
  @Field()
  readonly user_id: number;
  @Field()
  readonly start_time: string;
  @Field()
  readonly end_time: string;
  @Field()
  readonly public: boolean;
}