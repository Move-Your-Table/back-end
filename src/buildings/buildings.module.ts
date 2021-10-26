import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsResolver } from './buildings.resolver';

@Module({
  providers: [BuildingsService, BuildingsResolver]
})
export class BuildingsModule {}
