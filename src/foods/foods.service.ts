import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateFoodInput } from './dto/CreateFood.dto';
import { UpdateFoodInput } from './dto/UpdateFood.dto';
import { Food } from './entity/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food) private foodRepository: Repository<Food>,
    private readonly categoryService: CategoriesService,
  ) {}

  async getFoodById(id: number): Promise<Food> {
    return this.foodRepository.findOne({ where: { id } });
  }

  async findAllFood(): Promise<Food[]> {
    return this.foodRepository.find({ order: { createdAt: 'DESC' } });
  }

  async createFood(dto: CreateFoodInput): Promise<Food> {
    const category = await this.categoryService.getCategoryById(dto.categoryId);
    if (!category) throw new NotFoundException('No se econtro la categoria');

    const newFood = new Food();
    newFood.name = dto.name.trim().toLocaleLowerCase();
    newFood.description = dto.description.trim().toLocaleLowerCase();
    newFood.imagen = dto.imagen;
    newFood.price = dto.price;
    newFood.category = category;

    return this.foodRepository.save(newFood);
  }

  async updateFood(id: number, dto: UpdateFoodInput): Promise<Food> {
    const food = await this.getFoodById(id);
    if (!food) throw new NotFoundException('No se encontro la comida');

    const category = await this.categoryService.getCategoryById(dto.categoryId);
    if (!category) throw new NotFoundException('No se encontro la categoria');

    const editFood = Object.assign(food, {
      name: dto.name?.trim().toLocaleLowerCase() || food.name,
      description:
        dto.description?.trim().toLocaleLowerCase() || food.description,
      imagen: dto.imagen || food.imagen,
      price: dto.price || food.price,
      category: category || food.category,
    });

    return this.foodRepository.save(editFood);
  }

  async deleteFood(id: number): Promise<boolean> {
    const food = await this.foodRepository.delete(id);
    if (food.affected === 1) {
      return true;
    }
    return false;
  }

  getCategory(id: number): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }
}
