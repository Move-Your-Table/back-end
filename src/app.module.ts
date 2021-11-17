import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BuildingsModule } from './buildings/buildings.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { DesksModule } from './desks/desks.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      playground: true
    }),
    ConfigModule.forRoot(),
    BuildingsModule,
    RoomsModule,
    DesksModule,
    MongooseModule.forRoot(process.env.MONGOOSE_CONNECTIONSTRING)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
