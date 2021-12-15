import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { AddressInput, AddressType, AddressUpdate } from './address.dto';
import { RoomType } from '../../rooms/dto/room.dto';

@ObjectType()
export class BuildingType {
  @Field(() => ID)
  readonly _id: ObjectId;
  @Field()
  readonly name: string;
  @Field()
  readonly address: AddressType;
  @Field(type => [RoomType])
  readonly rooms: RoomType[]
}


@InputType()
export class BuildingInput {
  @Field()
  name: string;
  @Field()
  address: AddressInput;
}

@InputType()
export class BuildingUpdateInput {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  address?: AddressUpdate;
}

