import { ObjectType, Field, ID } from '@nestjs/graphql';
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
