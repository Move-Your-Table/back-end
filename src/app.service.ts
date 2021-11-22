import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World! Do not know how to speak';
  }

  getName(): string {
    return 'MoveYourTable';
  }
}
