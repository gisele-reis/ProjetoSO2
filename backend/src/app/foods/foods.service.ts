import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoodsService {

  constructor(
    @InjectRepository(Food)
    private readonly repository: Repository<Food>
  ) {}

  createFood(dto: CreateFoodDto) {
    const food = this.repository.create(dto);
    return this.repository.save(food);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async updateFood(id: string, dto: UpdateFoodDto) {
    const food = await this.repository.findOneBy({ id });
    if(!food) return null;
    this.repository.merge(food, dto);
    return this.repository.save(food);
  }

  async removeFood(id: string) {
    const food = await this.repository.findOneBy({ id });
    if(!food) return null;
    return this.repository.remove(food);
  }
}
