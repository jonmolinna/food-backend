import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FoodLike } from 'src/food_like/entity/food_like.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ type: 'varchar', length: 200, name: 'last_name' })
  @Field()
  lastName: string;

  @Column({ type: 'varchar', length: 200 })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 20 })
  @Field()
  phone: string;

  @Column({ type: 'varchar', length: 20 })
  @Field()
  dni: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Field()
  createdAt: Date;

  @OneToMany(() => FoodLike, (foodLike) => foodLike.user)
  @Field(() => [FoodLike], { nullable: true })
  foodLikes?: FoodLike[];
}
