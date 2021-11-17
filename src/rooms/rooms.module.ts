import { Module } from '@nestjs/common';
import { RoomsResolver } from './rooms.resolver';
import { BuildingsModule } from '../buildings/buildings.module';

@Module({
  imports: [BuildingsModule],
  providers: [RoomsResolver],
})
export class RoomsModule {}
