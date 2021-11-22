import { Controller, Get, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { BuildingController } from './buildings/building.controller';
import { Building } from './buildings/interfaces/building.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly buildingController: BuildingController) {}

  @MessagePattern('test')
  getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
  }


  @Get()
  getHello() : string {
    return this.appService.getHello();
  }
  
  
  @Get("/name")
  getName() : string {
    return this.appService.getName();
  }

  @Get("/building")
  getBuilding() : Promise<Building> {
      return this.buildingController.getBuilding("619b9bc46c2d9305f675c122");
  }
}
