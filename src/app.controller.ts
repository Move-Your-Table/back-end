import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';
import { BuildingController } from './buildings/building.controller';
import { Building } from './buildings/interfaces/building.interface';
import { RoomsController } from './rooms/rooms.controller';

@Controller()
export class AppController {
  constructor(@Inject('MYT_SERVICE') private client: ClientProxy, 
  private readonly buildingController: BuildingController,
  private readonly roomsController: RoomsController) {}

  @MessagePattern('getRoomsInBuilding')
  async getRoomsInBuilding(@Payload() data: string, @Ctx() context: RmqContext) {
    const rooms = await this.roomsController.getRoomsInBuilding(data);
    this.client.send("roomsInBuilding", rooms).subscribe();

    this.acknowledgeMessage(context);
  }

  @MessagePattern('addRoomInBuilding')
  async addRoomInBuilding(@Payload() data: string, @Ctx() context: RmqContext) {
    const newRoom = JSON.parse(data);

    this.acknowledgeMessage(context);
  }

  @Get("/building")
  getBuilding() : Promise<Building> {
      return this.buildingController.getBuilding("619b9bc46c2d9305f675c122");
  }

  private acknowledgeMessage(context) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
