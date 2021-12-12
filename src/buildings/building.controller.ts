import { Controller, Get } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";


@Controller()
export class BuildingController {
    constructor(private readonly buildingService: BuildingsService) {}

    getBuilding(id : string) {
        return this.buildingService.findOne(id);
    }

    getAllBuildings() {
        return this.buildingService.findAll();
    }

    addBuilding(name: string, address: string) {
        return this.buildingService.createBuilding(name, address);
    }

    updateBuilding(buildingId: string, name: string, address: string) {
        return this.buildingService.updateBuilding(buildingId, name, address);
    }

    deleteBuilding(buildingId: string) {
        return this.buildingService.deleteBuilding(buildingId);
    }
}