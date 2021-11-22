import { Module } from '@nestjs/common';
import { BuildingsModule } from '../buildings/buildings.module';

@Module({
  imports: [BuildingsModule],
})
export class DesksModule {}
