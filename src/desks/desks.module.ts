import { Module } from '@nestjs/common';
import { DesksResolver } from './desks.resolver';
import { BuildingsModule } from '../buildings/buildings.module';

@Module({
  imports: [BuildingsModule],
  providers: [DesksResolver],
})
export class DesksModule {}
