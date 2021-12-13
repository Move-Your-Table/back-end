import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import { BookingType } from '../bookings/dto/booking.dto';
import { DeskType } from '../desks/dto/desk.dto';

@Resolver(of => DeskType)
export class DesksResolver {
    constructor() {};

    @ResolveField(returns => Array<BookingType>())
    bookings(@Parent() desk : DeskType,
    @Args('_id', { type: () => String, nullable: true }) id?: string,
    @Args('before', { type: () => Date, nullable: true }) before?: Date,
    @Args('after', { type: () => Date, nullable: true }) after?: Date) : Array<BookingType> {

        let bookings = desk.bookings;

        if(id) {
            return bookings.filter(booking => booking._id.toString() == id);
        } else {
            if(before) {
                bookings = bookings.filter(booking => new Date(booking.end_time) <= before);
            }

            if(after) {
                bookings = bookings.filter(booking => new Date(booking.start_time) >= after);
            }

            return bookings;
        }
    }

}
