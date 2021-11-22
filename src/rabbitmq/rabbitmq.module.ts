import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: 'MATH_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://localhost:${process.env.RABBITMQ_PORT}`],
            queue: 'math_queue',
            queueOptions: {
              durable: false
            },
          },
        },
      ]),
    ]
})

export class RabbitMQModule {};
