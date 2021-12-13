import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { BuildingsModule } from './buildings/buildings.module';
import { RoomsModule } from './rooms/rooms.module';
import { DesksModule } from './desks/desks.module';
import { BookingsModule } from './bookings/bookings.module';
import { IncidentReportsModule } from './incidentreports/incidentreport.module';
import { GraphQLError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
      formatError: handleGraphQLError
    }),
    BuildingsModule,
    RoomsModule,
    DesksModule,
    IncidentReportsModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_ENDPOINT}:${process.env.MONGO_PORT}/${process.env.MONGO_INIT_DB}?authSource=admin`,
    ),
    forwardRef(() => BookingsModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

function handleGraphQLError(error : GraphQLError) {
  const formattedError = {
   message: error.message || error.message
  };
  return formattedError;
}