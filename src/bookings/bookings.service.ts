import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DesksService } from '../desks/desks.service';
import { Building } from '../buildings/interfaces/building.interface';

@Injectable()
export class BookingsService {
    constructor(@InjectModel('Building') private buildingModel : Model<Building>,
    private deskService : DesksService) {};

    async getBookingsForDesk(buildingId, roomName, deskName) {
        const desk = await this.deskService.getDeskInRoom(buildingId, roomName, deskName);
        return desk.bookings;
    }

    async addBooking(buildingId, roomName, deskName, booking) {
        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);
        const desk = room.desks.find(desk => desk.name == deskName)[0];

        desk.bookings.push(booking);

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }

    async cancelBooking(buildingId, roomName, deskName, bookingId) {
        const building = await this.buildingModel.findOne({_id: buildingId});
        const room = building.rooms.find(room => room.name == roomName);
        const desk = room.desks.find(desk => desk.name == deskName)[0];
        const bookingIndex = desk.bookings.findIndex(booking => booking.id == bookingId);

        desk.bookings.splice(bookingIndex, 1)

        building.save(err => {
            if(err) throw err;
            return true;
        });
    }
}
