import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Food } from 'src/foods/entity/food.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field()
  imagen: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Field()
  createdAt: Date;

  @OneToMany(() => Food, (food) => food.category)
  @Field(() => [Food], { nullable: true })
  foods?: Food[];
}
