import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    //just creat the product object in memory
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(idOrSlug: string) {
    const where = uuidValidate(idOrSlug)
      ? { id: idOrSlug }
      : { slug: idOrSlug };
    const product = await this.productRepo.findOne(where);
    if (!product) {
      throw new EntityNotFoundError(Product, idOrSlug);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepo.update(id, updateProductDto);
    return this.productRepo.findOne(id);
  }

  async remove(id: string) {
    await this.productRepo.delete(id);
  }
}
