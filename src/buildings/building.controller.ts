import { Controller } from "@nestjs/common";
import { BuildingsService } from "./buildings.service";
import { BuildingUpdateInput } from "./dto/building.dto";
import { Address } from "./interfaces/address.interface";

@Controller()
export class BuildingController {
    constructor(private readonly buildingService: BuildingsService) {}

    getBuilding(id : string) {
        return this.buildingService.findOne(id);
    }

    getAllBuildings() {
        return this.buildingService.findAll();
    }

    addBuilding(name: string, address: Address) {
        return this.buildingService.createBuilding(name, address);
    }

    async updateBuilding(buildingId: string, updateInput : BuildingUpdateInput) {
        return this.buildingService.updateBuilding(buildingId, updateInput);
    }

    deleteBuilding(buildingId: string) {
        return this.buildingService.deleteBuilding(buildingId);
    }
}