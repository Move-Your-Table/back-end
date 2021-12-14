import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { BookingsService } from "./bookings.service";
import { BookingInput } from "./dto/booking.dto";
import { BuildingsService } from "../buildings/buildings.service";
import { UsersService } from "../users/users.service";

@Controller()
export class BookingsController {
    constructor(@Inject('MYT_SERVICE') private client: ClientProxy,
    private readonly buildingService: BuildingsService,
    private readonly userService: UsersService,
    private readonly bookingsService: BookingsService) {}

    async addBooking(buildingId: string, roomName: string, deskName: string, booking: BookingInput) {
        if(new Date(booking.start_time).getTime() < new Date().getTime()) {
            throw "You can't book a desk in the past...";
        }

        if(new Date(booking.end_time).getTime() < new Date(booking.start_time).getTime()) {
            throw "The end time of your booking has to be after the start time.";
        }  

        if(await this.bookingsService.hasBookingsInTimeRange(buildingId, roomName, deskName, booking.start_time, booking.end_time)) {
            throw "The desk has already been booked at that time.";
        }

        const building = await this.buildingService.findOne(buildingId);
        const newBooking = await this.bookingsService.addBooking(buildingId, roomName, deskName, booking);
        const user = await this.userService.findOne(newBooking.user_id);

        // Send RabbitMQ message that a booking has been created
        this.client.send("booking-created", {
            id: newBooking._id,
            building: {
                buildingId: buildingId,
                buildingName: building.name
            },
            room: {
                roomName: roomName
            },
            desk: {
                deskName: deskName
            },
            startTime: newBooking.start_time,
            endTime: newBooking.end_time,
            reserved_for: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phonenumber: user.phonenumber,
                role: user.role
            }
        }).subscribe();

        return newBooking;
    }

    async cancelBooking(buildingId: string, roomName: string, deskName: string, bookingId: string) {
        return await this.bookingsService.cancelBooking(buildingId, roomName, deskName, 
            bookingId);
    }
}