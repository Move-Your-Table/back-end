import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';
import { BuildingController } from './buildings/building.controller';
import { Building } from './buildings/interfaces/building.interface';
import { DesksController } from './desks/desks.controller';
import { AddDesk } from './desks/interfaces/add_desk.interface';
import { DeleteDesk } from './desks/interfaces/delete_desk.interface';
import { AddRoom } from './rooms/interfaces/addroom.interface';
import { DeleteRoom } from './rooms/interfaces/deleteroom.interface';
import { RoomsController } from './rooms/rooms.controller';

@Controller()
export class AppController {
  constructor(@Inject('MYT_SERVICE') private client: ClientProxy, 
  private readonly buildingController: BuildingController,
  private readonly roomsController: RoomsController,
  private readonly deskController : DesksController) {}

  @MessagePattern('getRoomsInBuilding')
  async getRoomsInBuilding(@Payload() data: string, @Ctx() context: RmqContext) {
    const rooms = await this.roomsController.getRoomsInBuilding(data);
    this.client.send("roomsInBuilding", rooms).subscribe();

    this.acknowledgeMessage(context);
  }

  @MessagePattern('addRoomInBuilding')
  async addRoomInBuilding(@Payload() data: AddRoom, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const room = data.room;

    await this.roomsController.addRoomInBuilding(buildingId, room);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('updateRoomInBuilding')
  async updateRoomInBuilding(@Payload() data: AddRoom, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const room = data.room;

    await this.roomsController.updateRoomInBuilding(buildingId, room);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('deleteRoomInBuilding')
  async deleteRoomInBuilding(@Payload() data: DeleteRoom, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;

    await this.roomsController.deleteRoomInBuilding(buildingId, roomName);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('addDeskToRoom')
  async addDeskToRoom(@Payload() data: AddDesk, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const desk = data.desk;

    await this.deskController.addDeskToRoom(buildingId, roomName, desk);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('deleteDeskInRoom')
  async deleteDeskInRoom(@Payload() data: DeleteDesk, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;

    await this.deskController.deleteDeskInRoom(buildingId, roomName, deskName);

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
