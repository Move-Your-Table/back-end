import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
export class DeskType {
  @Field()
  readonly name: string;
}
