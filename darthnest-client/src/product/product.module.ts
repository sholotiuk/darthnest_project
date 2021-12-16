import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DARTHVEN_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'darthven_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
