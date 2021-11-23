import { Controller } from "@nestjs/common";
import { DesksService } from "./desks.service";

@Controller()
export class DesksController {
    constructor(private readonly deskService: DesksService) {}

    async getDeskInRoom(buildingId, roomName) {
        return await this.deskService.getDesksInRoom(buildingId, roomName);
    }

    async addDeskToRoom(buildingId, roomName, desk) {
        return await this.deskService.addDeskToRoom(buildingId, roomName, desk);
    }

    async editDeskInRoom(buildingId, roomName, deskName, desk) {
        return await this.deskService.editDeskInRoom(buildingId, roomName, deskName, desk);
    }

    async deleteDeskInRoom(buildingId, roomName, deskName) {
        return await this.deskService.deleteDeskInRoom(buildingId, roomName, deskName);
    }
}