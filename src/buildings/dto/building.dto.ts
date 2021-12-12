import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { RoomType } from 'src/rooms/dto/room.dto';

@ObjectType()
export class BuildingType {
  @Field(() => ID)
  readonly _id: ObjectId;
  @Field()
  readonly name: string;
  @Field()
  readonly address: string;
  @Field(type => [RoomType])
  readonly rooms: RoomType[]
}


@InputType()
export class BuildingInput {
  @Field()
  name: string;
  @Field()
  address: string;
}
