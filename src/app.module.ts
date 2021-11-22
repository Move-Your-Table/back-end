import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BuildingsModule } from './buildings/buildings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { DesksModule } from './desks/desks.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BuildingsModule,
    RoomsModule,
    DesksModule,
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@localhost:${process.env.MONGO_PORT}`),
    ClientsModule.register([
      {
        name: 'MYT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://localhost:${process.env.RABBITMQ_PORT}`],
          queue: 'backend_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
