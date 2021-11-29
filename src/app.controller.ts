import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';
import { BuildingController } from './buildings/building.controller';
import { Building } from './buildings/interfaces/building.interface';
import { DesksController } from './desks/desks.controller';
import { AddDesk } from './desks/interfaces/add_desk.interface';
import { DeleteDesk } from './desks/interfaces/delete_desk.interface';
import { EditDesk } from './desks/interfaces/edit_desk.interface';
import { GetDesks } from './desks/interfaces/get_desks_interface';
import { AddRoom } from './rooms/interfaces/addroom.interface';
import { DeleteRoom } from './rooms/interfaces/deleteroom.interface';
import { EditRoom } from './rooms/interfaces/editroom.interface';
import { RoomsController } from './rooms/rooms.controller';

@Controller()
export class AppController {
  constructor(@Inject('MYT_SERVICE') private client: ClientProxy, 
  private readonly buildingController: BuildingController,
  private readonly roomsController: RoomsController,
  private readonly deskController : DesksController) {}

  @MessagePattern('getAllBuildings')
  async getAllBuildings(@Payload() data: string, @Ctx() context: RmqContext) {

    const buildings = await this.buildingController.getAllBuildings();
    console.log(buildings);
    this.client.send('getAllBuildings', buildings).subscribe();

    this.acknowledgeMessage(context);
  }

  @MessagePattern('deleteBuilding')
  async deleteBuilding(@Payload() data: any, @Ctx() context: RmqContext) {

    const buildingId = data.id;
    const building = await this.buildingController.getBuilding(buildingId);

    await this.buildingController.deleteBuilding(building);

    this.acknowledgeMessage(context);
  }

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
  async updateRoomInBuilding(@Payload() data: EditRoom, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const room = data.room;

    await this.roomsController.updateRoomInBuilding(buildingId, roomName, room);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('deleteRoomInBuilding')
  async deleteRoomInBuilding(@Payload() data: DeleteRoom, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;

    await this.roomsController.deleteRoomInBuilding(buildingId, roomName);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('addBuilding')
  async addBuilding(@Payload() data: any, @Ctx() context: RmqContext) {

    const buildingName = data.name;
    const address = data.address;
   
    await this.buildingController.addBuilding(buildingName, address)

    this.acknowledgeMessage(context);
  }

  @MessagePattern('updateBuilding')
  async updateBuilding(@Payload() data: any, @Ctx() context: RmqContext) {

    const buildingId = data.id;
    const buildingName = data.name;
    const address = data.address;
    
    const building = await this.buildingController.getBuilding(buildingId);

    await this.buildingController.updateBuilding(building, buildingName, address);

    this.acknowledgeMessage(context);
  }

  @MessagePattern('getDesksInRoom')
  async getDesksInRoom(@Payload() data: GetDesks, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;

    console.log(await this.deskController.getDesksInRoom(buildingId, roomName));
  }

  @MessagePattern('addDeskToRoom')
  async addDeskToRoom(@Payload() data: AddDesk, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const desk = data.desk;

    await this.deskController.addDeskToRoom(buildingId, roomName, desk);
  }

  @MessagePattern('editDeskInRoom')
  async editDeskInRoom(@Payload() data: EditDesk, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;
    const editedDesk = data.desk;

    await this.deskController.editDeskInRoom(buildingId, roomName, deskName, editedDesk);
  }

  @MessagePattern('deleteDeskInRoom')
  async deleteDeskInRoom(@Payload() data: DeleteDesk, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;

    await this.deskController.deleteDeskInRoom(buildingId, roomName, deskName);
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
