import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, RmqContext, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MYT_SERVICE') private client: ClientProxy) {}

  @MessagePattern('test')
  getTestMessage(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
  }
}
