import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Room } from '../rooms/interfaces/room.interface';
import { RoomType } from '../rooms/dto/room.dto';
import { RoomService } from '../rooms/rooms.service';
import { BuildingsService } from './buildings.service';
import { BuildingType, BuildingInput } from './dto/building.dto';
import { incidentReportInput, IncidentReportType } from '../incidentreports/dto/incidentreport.dto';
import { Types } from 'mongoose';
import { IncidentReportController } from '../incidentreports/incidentreport.controller';
import { BookingType, BookingInput} from '../bookings/dto/booking.dto';
import { BookingsController } from '../bookings/bookings.controller';

@Resolver(of => BuildingType)
export class BuildingsResolver {
    constructor(private readonly buildingService : BuildingsService,
      private readonly roomService : RoomService,
      private readonly incidentReportsController : IncidentReportController,
      private readonly bookingsController : BookingsController) {};
    
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
      
      
    @ResolveField(returns => [RoomType])
    async rooms(@Parent() building : BuildingType,
    @Args('name', { type: () => String, nullable: true }) name?: string) : Promise<Room[]> {
        const buildingId = building._id;

        if(name) {
          const room = await this.roomService.getRoomByName(buildingId, name);
          return room ? [room] : new Array<Room>();
        } else {
          return this.roomService.getRooms(buildingId);
        }
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
}
