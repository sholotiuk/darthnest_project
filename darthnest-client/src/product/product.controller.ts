import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('DARTHVEN_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.client.connect();
    } catch (err: unknown) {
      console.error(err);
    }
  }

  @Post()
  createProduct(@Body() model: ProductModel) {
    this.client.emit<void, ProductModel>('product_created', model);
  }

  @Put(':id')
  updateProduct(@Param() id: string, @Body() model: ProductModel) {
    this.client.emit<void, { id: string } & Partial<ProductModel>>(
      'product_updated',
      { id, ...model },
    );
  }

  @Delete(':id')
  deleteProduct(@Param() id: string) {
    this.client.emit<void, string>('product_deleted', id);
  }
}
