import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsResolver } from './buildings.resolver';
import { BuildingSchema } from './building.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}])],
  providers: [BuildingsService, BuildingsResolver]
})
export class BuildingsModule {}
