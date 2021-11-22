import { Module } from '@nestjs/common';
import { BuildingsModule } from '../buildings/buildings.module';
import { RoomsController } from './rooms.controller';

@Module({
  imports: [BuildingsModule],
  providers: [RoomsController],
  exports: [RoomsController]
})
export class RoomsModule {}
