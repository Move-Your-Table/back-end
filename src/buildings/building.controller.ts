import { Controller, Get } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";
import { Building } from "./interfaces/building.interface";


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

    updateBuilding(building: Building, name: string, address: string) {
        return this.buildingService.updateBuilding(building, name, address);
    }

    deleteBuilding(building: Building) {
        return this.buildingService.deleteBuilding(building);
    }
}