import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DesksModule } from 'src/desks/desks.module';
import { BuildingSchema } from '../buildings/building.schema';
import { UsersModule } from '../users/users.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
            DesksModule, UsersModule],
  providers: [BookingsService, BookingsController, BookingsResolver],
  exports: [BookingsController]
})
export class BookingsModule {}
