import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UserType } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { BookingType } from './dto/booking.dto';

@Resolver(of => BookingType)
export class BookingsResolver {
    constructor(private readonly userService : UsersService) {};

    @ResolveField(returns => UserType)
    async user(@Parent() booking : BookingType) : Promise<UserType> {
        return await this.userService.findOne(booking.user_id);
    }

}
