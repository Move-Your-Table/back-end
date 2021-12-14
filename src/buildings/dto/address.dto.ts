import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressType {
    @Field()
    readonly country: string;
    @Field()
    readonly postalcode: string;
    @Field()
    readonly city: string;
    @Field()
    readonly street: string;
}

@InputType()
export class AddressInput {
    @Field()
    readonly country: string;
    @Field()
    readonly postalcode: string;
    @Field()
    readonly city: string;
    @Field()
    readonly street: string;
}
