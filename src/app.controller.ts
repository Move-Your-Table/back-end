import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern('test')
  getNotifications(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
  }
}
