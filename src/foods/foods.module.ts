import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entity/food.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  providers: [FoodsService, FoodsResolver],
  imports: [TypeOrmModule.forFeature([Food]), CategoriesModule],
  exports: [FoodsService],
})
export class FoodsModule {}
