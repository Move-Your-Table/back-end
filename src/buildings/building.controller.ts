import { Controller, Get } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";


@Controller()
export class BuildingController {
    constructor(private readonly buildingService: BuildingsService) {}

    getBuilding(id : string) {
        return this.buildingService.findOne(id);
    }
}