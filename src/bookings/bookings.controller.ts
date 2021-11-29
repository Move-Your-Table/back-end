import { Controller } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { Booking } from "./interfaces/booking.interface";

@Controller()
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    async addBooking(buildingId: string, roomName: string, deskName: string, booking: Booking) {
        return await this.bookingsService.addBooking(buildingId, roomName, deskName, booking);
    }

    async cancelBooking(buildingId: string, roomName: string, deskName: string, bookingId: string) {
        return await this.bookingsService.cancelBooking(buildingId, roomName, deskName, 
            bookingId);
    }
}