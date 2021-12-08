import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BuildingsModule } from './buildings/buildings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { DesksModule } from './desks/desks.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { IncidentReportsModule } from './incidentreports/incidentreport.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      playground: true,
    }),
    ConfigModule.forRoot(),
    BuildingsModule,
    RoomsModule,
    DesksModule,
    IncidentReportsModule,
    UsersModule,
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
