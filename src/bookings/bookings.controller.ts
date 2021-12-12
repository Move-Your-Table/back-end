import { Controller } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { Booking } from "./interfaces/booking.interface";

@Controller()
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    async addBooking(buildingId: string, roomName: string, deskName: string, booking: Booking) {
        if(new Date(booking.start_time).getTime() < new Date().getTime()) {
            throw "You can't book a desk in the past...";
        }

        if(new Date(booking.end_time).getTime() < new Date(booking.start_time).getTime()) {
            throw "The end time of your booking has to be after the start time.";
        }  

        if(await this.bookingsService.hasBookingsInTimeRange(buildingId, roomName, deskName, booking.start_time, booking.end_time)) {
            throw "The desk has already been booked at that time.";
        }

        return await this.bookingsService.addBooking(buildingId, roomName, deskName, booking);
    }

    async cancelBooking(buildingId: string, roomName: string, deskName: string, bookingId: string) {
        return await this.bookingsService.cancelBooking(buildingId, roomName, deskName, 
            bookingId);
    }
}