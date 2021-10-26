import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './buildings/buildings.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
    }),
    MongooseModule.forRoot("mongodb://localhost/MoveYourTable"),
    BuildingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
