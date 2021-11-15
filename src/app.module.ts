import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BuildingsModule } from './buildings/buildings.module';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      playground: true
    }),
    ConfigModule.forRoot(),
    BuildingsModule,
    MongooseModule.forRoot(process.env.MONGOOSE_CONNECTIONSTRING)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
