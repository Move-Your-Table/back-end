import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.NESTJS_PORT);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBITMQ_ENDPOINT}:${process.env.RABBITMQ_PORT}`],
      queue: "backend_queue",
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });
 
  app.startAllMicroservices();
}
bootstrap();
