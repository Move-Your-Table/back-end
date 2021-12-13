import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DesksModule } from 'src/desks/desks.module';
import { BuildingSchema } from '../buildings/building.schema';
import { UsersModule } from '../users/users.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { BuildingsModule } from '../buildings/buildings.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Building', schema: BuildingSchema}]),
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MYT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_ENDPOINT}:${process.env.RABBITMQ_PORT}`,
          ],
          queue: 'bookings',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    DesksModule, 
    UsersModule,
    forwardRef(() => BuildingsModule)],
  providers: [BookingsService, BookingsController, BookingsResolver],
  exports: [BookingsController]
})
export class BookingsModule {}
