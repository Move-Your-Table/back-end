import { Booking } from "./booking.interface";

export interface AddBooking {
    readonly buildingId: string,
    readonly roomName: string,
    readonly deskName: string,
    readonly booking: Booking
}