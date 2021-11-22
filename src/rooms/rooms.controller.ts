import { Controller, Get } from "@nestjs/common";
import { BuildingsService } from "../buildings/buildings.service";


@Controller()
export class RoomsController {
    constructor(private readonly buildingService: BuildingsService) {}

    async getRoomsInBuilding(buildingId: string) {
        return await this.buildingService.findOne(buildingId, "rooms");
    }

    async addRoomInBuilding(buildingId: string, room: object) {
        return await this.buildingService.addRoom(buildingId, room);
    }
}