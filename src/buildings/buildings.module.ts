import { Module } from '@nestjs/common';
import { BuildingsResolver } from './buildings.resolver';
import { BuildingSchema } from './building.schema';
import { BuildingsService } from './buildings.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}])],
  providers: [BuildingsService, BuildingsResolver],
  exports: [BuildingsService]
})
export class BuildingsModule {}
