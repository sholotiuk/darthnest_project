import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, ObjectID, Repository, UpdateResult } from 'typeorm';

import { Product } from '../entity/product.entity';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async find(data: Partial<Product>): Promise<Product[]> {
    return this.productRepository.find(data ? { where: data } : {});
  }

  async findOne(id: string | ObjectID): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async create(model: ProductModel): Promise<InsertResult> {
    return this.productRepository.insert(model);
  }

  async update(
    id: string | ObjectID,
    data: Partial<ProductModel>,
  ): Promise<UpdateResult> {
    return this.productRepository.update(id, data);
  }

  async delete(id: string | ObjectID): Promise<void> {
    await this.productRepository.delete(id);
  }
}
