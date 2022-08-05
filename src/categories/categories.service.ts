import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/CreateCategory.dto';
import { UpdateCategoryInput } from './dto/UpdateCategory.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategoryById(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['foods'],
    });
  }

  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['foods'],
      order: { createdAt: 'DESC' },
    });
  }

  async createCategory(dto: CreateCategoryInput): Promise<Category> {
    const newCategory = new Category();
    newCategory.name = dto.name.trim().toLocaleLowerCase();
    newCategory.imagen = dto.imagen;

    return this.categoryRepository.save(newCategory);
  }

  async updateCategory(
    id: number,
    dto: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (!category) throw new NotFoundException('No se encontro la categoria');

    const editCategory = Object.assign(category, {
      name: dto.name.trim().toLocaleLowerCase(),
      imagen: dto.imagen || category.imagen,
    });

    return this.categoryRepository.save(editCategory);
  }

  async deleteCategory(id: number): Promise<boolean> {
    const category = await this.categoryRepository.delete(id);
    if (category.affected === 1) {
      return true;
    }
    return false;
  }
}
