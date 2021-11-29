import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildingsModule } from './buildings/buildings.module';
import { RoomsModule } from './rooms/rooms.module';
import { DesksModule } from './desks/desks.module';
import { BookingsModule } from './bookings/bookings.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    BuildingsModule,
    RoomsModule,
    DesksModule,
    BookingsModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@localhost:${process.env.MONGO_PORT}/MYT?authSource=admin`),
    ClientsModule.register([
      {
        name: 'MYT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:${process.env.RABBITMQ_PORT}`],
          queue: 'frontend_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
