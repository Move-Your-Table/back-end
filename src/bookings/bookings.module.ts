import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesksModule } from 'src/desks/desks.module';
import { BuildingSchema } from '../buildings/building.schema';
import { BookingsService } from './bookings.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
            DesksModule],
  providers: [BookingsService],
})
export class BookingsModule {}
