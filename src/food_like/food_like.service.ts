import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/foods/entity/food.entity';
import { FoodsService } from 'src/foods/foods.service';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateFoodLikeInput } from './dto/CreateFoodLike.dto';
import { FoodLike } from './entity/food_like.entity';

@Injectable()
export class FoodLikeService {
  constructor(
    @InjectRepository(FoodLike)
    private foodLikeRepository: Repository<FoodLike>,
    private readonly foodService: FoodsService,
    private readonly userService: UsersService,
  ) {}

  async findAllLikesFoodByUser(idUser: number): Promise<FoodLike[]> {
    return await this.foodLikeRepository.find({
      where: { user: { id: idUser } },
      order: { createdAt: 'ASC' },
    });
  }

  async addLikeFoodByUser(dto: CreateFoodLikeInput): Promise<FoodLike> {
    const food = await this.foodService.getFoodById(dto.foodId);
    if (!food) throw new NotFoundException('No se econtro la comida');

    const user = await this.userService.getUserById(dto.userId);
    if (!user) throw new UnauthorizedException();

    const likeFood = new FoodLike();
    likeFood.food = food;
    likeFood.user = user;

    return this.foodLikeRepository.save(likeFood);
  }

  async deleteLikeFoodByUser(
    idLikeFood: number,
    idUser: number,
  ): Promise<boolean> {
    const foodLike = await this.foodLikeRepository.delete({
      id: idLikeFood,
      user: { id: idUser },
    });
    if (foodLike.affected === 1) {
      return true;
    }
    return false;
  }

  getFood(foodId: number): Promise<Food> {
    return this.foodService.getFoodById(foodId);
  }

  getUser(userId: number): Promise<User> {
    return this.userService.getUserById(userId);
  }
}
