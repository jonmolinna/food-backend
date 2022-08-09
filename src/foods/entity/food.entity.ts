import { Field, Float, ObjectType, ID, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entity/category.entity';
import { FoodLike } from 'src/food_like/entity/food_like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Food {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  description: string;

  @Column({ type: 'varchar' })
  @Field()
  imagen: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Int)
  categoryId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Field()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.foods)
  @Field(() => Category, { nullable: true })
  category: Category;

  @OneToMany(() => FoodLike, (foodLike) => foodLike.food)
  @Field(() => [FoodLike], { nullable: true })
  foodLikes?: FoodLike[];
}
