import { Controller } from "@nestjs/common";
import { RoomService } from "./rooms.service";

@Controller()
export class RoomsController {
    constructor(private readonly roomService: RoomService) {}

    async getRoomsInBuilding(buildingId: string) {
        return await this.roomService.getRooms(buildingId);
    }

    async addRoomInBuilding(buildingId: string, room: object) {
        return await this.roomService.addRoom(buildingId, room);
    }

    async updateRoomInBuilding(buildingId: string, updateRoom: object) {
        return await this.roomService.updateRoom(buildingId, updateRoom);
    }

    async deleteRoomInBuilding(buildingId: string, roomName: string) {
        return await this.roomService.deleteRoom(buildingId, roomName);
    }
}