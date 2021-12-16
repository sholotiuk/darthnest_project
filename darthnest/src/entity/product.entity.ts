import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { ProductModel } from '../product/product.model';

@Entity()
export class Product implements ProductModel {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  price: number;

  @Column()
  createdAt: Date;
}
