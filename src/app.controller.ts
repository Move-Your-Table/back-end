import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';
import { BuildingController } from './buildings/building.controller';
import { Building } from './buildings/interfaces/building.interface';

@Controller()
export class AppController {
  constructor(@Inject('MYT_SERVICE') private client: ClientProxy, private readonly buildingController: BuildingController) {}

  @MessagePattern('test')
  getTestMessage(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
  }

  @MessagePattern('getAllBuildings')
  async getAllBuildings(@Payload() data: string, @Ctx() context: RmqContext) {

    const buildings = await this.buildingController.getAllBuildings();
    console.log(buildings);
    this.client.send('getAllBuildings', buildings).subscribe();

    this.acknowledge(context);
  }

  @MessagePattern('addBuilding')
  async addBuilding(@Payload() data: any, @Ctx() context: RmqContext) {

    const buildingName = data.name;
    const address = data.address;
   
    await this.buildingController.addBuilding(buildingName, address)

    this.acknowledge(context);
  }


  @Get("/building")
  getBuilding() : Promise<Building> {
      return this.buildingController.getBuilding("619b9bc46c2d9305f675c122");
  }

  @Get("/buildings")
  getBuildings() : Promise<Array<Building>> {
      return this.buildingController.getAllBuildings();
  }


  private acknowledge(context) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
  }
}
