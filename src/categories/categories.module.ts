import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { Category } from './entity/category.entity';

@Module({
  providers: [CategoriesResolver, CategoriesService],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
