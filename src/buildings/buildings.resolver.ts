import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BuildingsService } from './buildings.service';
import { BuildingType, BuildingInput } from './dto/building.dto';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService) {};
    
    @Query(() => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingService.findAll();
    }

    @Query(() => BuildingType, {name: 'building'})
    async getBuilding(@Args('id', { type: () => String }) id: string) {
      return this.buildingService.findOne(id);
    }


    @Mutation(() => BuildingType)
    async addBuilding(
      @Args('buildingInput') buildingInput: BuildingInput): Promise<BuildingType> {
        return this.buildingService.createBuilding(buildingInput.name, buildingInput.address);
    }

    @Mutation(() => BuildingType)
    async updateBuilding(
      @Args('id') id: string,
      @Args('buildingInput') buildingInput: BuildingInput): Promise<BuildingType> {
        let updatedBuilding = await this.buildingService.updateBuilding(id, buildingInput.name, buildingInput.address);
        if (updatedBuilding.acknowledged !== true) {
            return null;
        }
        return this.buildingService.findOne(id);
    }

    @Mutation(() => BuildingType)
    async deleteBuilding(
      @Args('id') id: string) {
        return await this.buildingService.deleteBuilding(id);
    }
      
      
}
