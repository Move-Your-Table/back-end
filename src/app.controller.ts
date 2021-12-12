import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';
import { BookingsController } from './bookings/bookings.controller';
import { AddBooking } from './bookings/interfaces/add_booking.interface';
import { CancelBooking } from './bookings/interfaces/cancel_booking.interface';
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
import { IncidentReportController } from './incidentreports/incidentreport.controller';
import { GetRoomIncidentReports } from './incidentreports/interfaces/get_room_incidentreports.interface';
import { GetDeskIncidentReports } from './incidentreports/interfaces/get_desk_incidentreports.interface';
import { AddIncidentReportToRoom } from './incidentreports/interfaces/add_room_incidentreport.interface';
import { AddIncidentReportToDesk } from './incidentreports/interfaces/add_desk_incidentreport.interface';


@Controller()
export class AppController {
  constructor(@Inject('MYT_SERVICE') private client: ClientProxy, 
  private readonly buildingController: BuildingController,
  private readonly roomsController: RoomsController,
  private readonly deskController : DesksController,
  private readonly bookingsController : BookingsController,
  private readonly incidentReportController : IncidentReportController) {}

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

    await this.buildingController.deleteBuilding(buildingId);

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
    
    await this.buildingController.updateBuilding(buildingId, buildingName, address);

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

  @MessagePattern('addBooking')
  async addBooking(@Payload() data: AddBooking, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;
    const booking = data.booking;

    await this.bookingsController.addBooking(buildingId, roomName, deskName, booking);
    
    this.acknowledgeMessage(context);
  }

  @MessagePattern('cancelBooking')
  async cancelBooking(@Payload() data: CancelBooking, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;
    const bookingId = data.bookingId;

    await this.bookingsController.cancelBooking(buildingId, roomName, deskName, bookingId);
  
    this.acknowledgeMessage(context);
  }

  @Get("/building")
  getBuilding() : Promise<Building> {
      return this.buildingController.getBuilding("619b9bc46c2d9305f675c122");
  }




  @MessagePattern('getIncidentReportsFromRoom')
  async getIncidentReportsFromRoom(@Payload() data: GetRoomIncidentReports, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;

    console.log(await this.incidentReportController.getIncidentReportsFromRoom(buildingId, roomName));
  }


  @MessagePattern('getIncidentReportsFromDesk')
  async getIncidentReportsFromDesk(@Payload() data: GetDeskIncidentReports, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;

    console.log(await this.incidentReportController.getIncidentReportsFromDesk(buildingId, roomName, deskName));
  }

  @MessagePattern('addIncidentReportToRoom')
  async addIncidentReportToRoom(@Payload() data: AddIncidentReportToRoom, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const incidentReport = data.incidentReport;

    await this.incidentReportController.addIncidentReportToRoom(buildingId, roomName, incidentReport);
  }

  @MessagePattern('addIncidentReportToDesk')
  async addIncidentReportToDesk(@Payload() data: AddIncidentReportToDesk, @Ctx() context: RmqContext) {
    const buildingId = data.buildingId;
    const roomName = data.roomName;
    const deskName = data.deskName;

    const incidentReport = data.incidentReport;

    await this.incidentReportController.addIncidentReportToDesk(buildingId, roomName, deskName, incidentReport);
  }

  private acknowledgeMessage(context) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
}
