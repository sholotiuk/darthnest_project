import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { ProductService } from './product.service';
import { ProductModel } from './product.model';
import { Product } from '../entity/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query('name') name: string,
    @Query('manufacturer') manufacturer: string,
    @Query('price') price: number,
    @Query('createdAt') createdAt: Date,
  ): Promise<Product[]> {
    return this.productService.find({
      name,
      manufacturer,
      price,
      createdAt,
    });
  }

  @Get(':id')
  async getProductById(@Param() params): Promise<Product> {
    return this.productService.findOne(params.id);
  }

  @EventPattern('product_created')
  async handleProductCreated(model: ProductModel) {
    await this.productService.create(model);
  }

  @EventPattern('product_updated')
  async handleProductUpdated({
    id,
    ...data
  }: { id: string } & Partial<ProductModel>) {
    await this.productService.update(id, data);
  }

  @EventPattern('product_deleted')
  async handleProductDeleted(id: string) {
    await this.productService.delete(id);
  }
}
