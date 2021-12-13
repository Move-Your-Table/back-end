import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DesksService } from '../desks/desks.service';
import { Building } from '../buildings/interfaces/building.interface';
import { Booking } from './interfaces/booking.interface';

@Injectable()
export class BookingsService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>,
    private deskService : DesksService) {};

    async getBookingsForDesk(buildingId, roomName, deskName) {
        const desk = await this.deskService.getDeskInRoom(buildingId, roomName, deskName);
        return desk.bookings;
    }

    async hasBookingsInTimeRange(buildingId, roomName, deskName, startTime, endTime) {
        const bookings = await this.buildingModel.findOne(
            {_id: buildingId,
            "rooms.name": roomName,
            "rooms.desks.name": deskName,
            "rooms.desks.bookings.start_time":{$lte: new Date(endTime)}, 
            "rooms.desks.bookings.end_time":{$gte: new Date(startTime)}
            },
            {
                _id: 1
            }
        );

        return bookings != null;
    }

    async addBooking(buildingId, roomName, deskName, booking) : Promise<Booking> {
        return new Promise(async (resolve) => {
            const building = await this.buildingModel.findOne({_id: buildingId});
            const room = building.rooms.find(room => room.name == roomName);
            const desk = room.desks.find(desk => desk.name == deskName);

            booking._id = new Types.ObjectId();
            desk.bookings.push(booking);

            building.save(err => {
                if(err) throw err;
                return resolve(booking);
            });
        });
    }

    async cancelBooking(buildingId, roomName, deskName, bookingId) : Promise<Booking> {
        return new Promise(async (resolve) => {
            const building = await this.buildingModel.findOne({_id: buildingId});
            const room = building.rooms.find(room => room.name == roomName);
            const desk = room.desks.find(desk => desk.name == deskName);
            const bookingIndex = desk.bookings.findIndex(booking => booking._id.toString() == bookingId);
            const bookingToDelete = desk.bookings[bookingIndex];

            desk.bookings.splice(bookingIndex, 1)

            building.save(err => {
                if(err) throw err;
                return resolve(bookingToDelete);
            });
        });
    }
}
