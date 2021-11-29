import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesksModule } from 'src/desks/desks.module';
import { BuildingSchema } from '../buildings/building.schema';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
            DesksModule],
  providers: [BookingsService, BookingsController],
  exports: [BookingsController]
})
export class BookingsModule {}
