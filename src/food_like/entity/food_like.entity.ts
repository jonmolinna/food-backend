import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Food } from 'src/foods/entity/food.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class FoodLike {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Field()
  createdAt: Date;

  @Column()
  @Field(() => ID)
  userId: number;

  @Column()
  @Field(() => ID)
  foodId: number;

  @ManyToOne(() => User, (user) => user.foodLikes)
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => Food, (color) => color.foodLikes)
  @Field(() => Food, { nullable: true })
  food: Food;
}
