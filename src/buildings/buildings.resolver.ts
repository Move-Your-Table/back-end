import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Room } from '../rooms/interfaces/room.interface';
import { RoomType, RoomInput, RoomUpdateInput } from '../rooms/dto/room.dto';
import { RoomService } from '../rooms/rooms.service';
import { BuildingsService } from './buildings.service';
import { BuildingType, BuildingInput, BuildingUpdateInput } from './dto/building.dto';
import { incidentReportInput, IncidentReportType } from '../incidentreports/dto/incidentreport.dto';
import { Types } from 'mongoose';
import { IncidentReportController } from '../incidentreports/incidentreport.controller';
import { BookingType, BookingInput} from '../bookings/dto/booking.dto';
import { BookingsController } from '../bookings/bookings.controller';
import { BuildingController } from './building.controller';


@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingController : BuildingController,
      private readonly roomService : RoomService,
      private readonly incidentReportsController : IncidentReportController,
      private readonly bookingsController : BookingsController) {};
    
    @Query(() => [BuildingType])
    async buildings(): Promise<BuildingType[]> {
        return this.buildingController.getAllBuildings();
    }

    @Query(() => BuildingType, {name: 'building'})
    async getBuilding(@Args('id', { type: () => String }) id: string) {
      return this.buildingController.getBuilding(id);
    }


    @Mutation(() => BuildingType)
    async addBuilding(
      @Args('buildingInput') buildingInput: BuildingInput): Promise<BuildingType> {
        return this.buildingController.addBuilding(buildingInput.name, buildingInput.address);
    }

    @Mutation(() => BuildingType)
    async updateBuilding(
      @Args('id') id: string,
      @Args('buildingInput') buildingInput: BuildingUpdateInput): Promise<BuildingType> {
        let updatedBuilding = await this.buildingController.updateBuilding(id, buildingInput);
        if (updatedBuilding.acknowledged !== true) {
            return null;
        }
        return this.buildingController.getBuilding(id);
    }

    @Mutation(() => BuildingType)
    async deleteBuilding(
      @Args('id') id: string) {
        return await this.buildingController.deleteBuilding(id);
    }
      

    @ResolveField(returns => Number)
    async roomCount(@Parent() building : BuildingType) : Promise<number> {
      const buildingId = building._id;
      const rooms = await this.roomService.getRooms(buildingId);
      return rooms.length;
    }
      
    @ResolveField(returns => [RoomType])
    async rooms(@Parent() building : BuildingType,
    @Args('name', { type: () => String, nullable: true }) name?: string,
    @Args('type', { type: () => String, nullable: true }) type?: string) : Promise<Room[]> {
        const buildingId = building._id;
        let rooms = new Array<Room>();

        if(name) {
          const room = await this.roomService.getRoomByName(buildingId, name);
          rooms =  room ? [room] : new Array<Room>();
        } else {
          rooms = await this.roomService.getRooms(buildingId);
        }

        if(type) {
          rooms = rooms.filter(room => room.type === type);
        }

        return rooms;
    }

    @Mutation(() => BookingType)
    async addBookingToDesk(
      @Args('buildingId') buildingId: string,
      @Args('roomName') roomName: string,
      @Args('deskName') deskName: string,
      @Args('bookingInput') bookingInput: BookingInput) : Promise<BookingType> {
        return await this.bookingsController.addBooking(buildingId, roomName, deskName, bookingInput);
      }

    @Mutation(() => BookingType)
    async cancelBookingFromDesk(
      @Args('buildingId') buildingId: string,
      @Args('roomName') roomName: string,
      @Args('deskName') deskName: string,
      @Args('bookingId') bookingId: string): Promise<BookingType> {
        return await this.bookingsController.cancelBooking(buildingId, roomName, deskName, bookingId);
      }

    @Mutation(() => IncidentReportType)
    async addIncidentReportToRoom(
      @Args('buildingId') buildingId: string,
      @Args('roomName') roomName: string,
      @Args('incidentReportInput') incidentReportInput: incidentReportInput): Promise<IncidentReportType> {
        
        const newIncidentReport = {_id: new Types.ObjectId(), 
          user_id: incidentReportInput.user_id, 
          message: incidentReportInput.message};
       
        await this.incidentReportsController.addIncidentReportToRoom(
          buildingId, roomName, newIncidentReport);

          return newIncidentReport;
      }

      @Mutation(() => IncidentReportType)
      async addIncidentReportToDesk(
        @Args('buildingId') buildingId: string,
        @Args('roomName') roomName: string,
        @Args('deskName') deskName: string,
        @Args('incidentReportInput') incidentReportInput: incidentReportInput): Promise<IncidentReportType> {
          const newIncidentReport = {_id: new Types.ObjectId(), 
            user_id: incidentReportInput.user_id, 
            message: incidentReportInput.message};

          await this.incidentReportsController.addIncidentReportToDesk(buildingId, roomName, 
            deskName, newIncidentReport);

          return newIncidentReport;
        }

        @Mutation(() => Boolean)
        async removeIncidentReportFromRoom(
          @Args('buildingId') buildingId: string,
          @Args('roomName') roomName: string,
          @Args('incidentReportId') reportId: string): Promise<Boolean> {
            return this.incidentReportsController.
            removeIncidentReportFromRoom(buildingId, roomName, reportId);
        }

        @Mutation(() => Boolean)
        async removeIncidentReportFromDesk(
          @Args('buildingId') buildingId: string,
          @Args('roomName') roomName: string,
          @Args('deskName') deskName: string,
          @Args('incidentReportId') reportId: string): Promise<Boolean> {
            return this.incidentReportsController.
            removeIncidentReportFromDesk(buildingId, roomName, deskName, reportId);
        }


        @Mutation(() => RoomType)
        async addRoom(
          @Args('buildingId') buildingId: string,
          @Args('roomInput') roomInput: RoomInput): Promise<RoomType> {
            const newRoom = { 
              name: roomInput.name, 
              type: roomInput.type,
              floor: roomInput.floor,
              features: roomInput.features,
              desks: [],
              incidentReports: [] 
            };
      
            await this.roomService.addRoom(buildingId, newRoom);
            return newRoom;
        }


        @Mutation(() => RoomType)
        async updateRoom(
          @Args('buildingId') buildingId: string,
          @Args('roomName') roomName: string,
          @Args('roomInput') roomUpdateInput: RoomUpdateInput): Promise<RoomType> {

            let room = await this.roomService.getRoomByName(buildingId, roomName);

            const updatedRoom = { 
              name: roomUpdateInput.name ? roomUpdateInput.name : room.name, 
              type: roomUpdateInput.type ? roomUpdateInput.type : room.type,
              floor: roomUpdateInput.floor ? roomUpdateInput.floor : room.floor,
              features: roomUpdateInput.features ? roomUpdateInput.features : room.features,
              desks: room.desks,
              incidentReports: room.incidentReports 
            };
      
            await this.roomService.updateRoom(buildingId, roomName, updatedRoom);
            return updatedRoom;
        }


        @Mutation(() => RoomType)
        async removeRoom (
          @Args('buildingId') buildingId: string,
          @Args('roomName') roomName: string): Promise<RoomType> {

            let room = await this.roomService.getRoomByName(buildingId, roomName);

            if (await this.roomService.deleteRoom(buildingId, roomName)) {
              return room;
            }
        }
}
