import { Module } from '@nestjs/common';
import { BuildingSchema } from './building.schema';
import { BuildingsService } from './buildings.service';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}])],
  providers: [BuildingsService],
  exports: [BuildingsService]
})
export class BuildingsModule {}
