import { Field, Float, ObjectType, ID, Int } from '@nestjs/graphql';
import { Category } from 'src/categories/entity/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Food {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @Field()
  description: string;

  @Column()
  @Field()
  imagen: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Int)
  categoryId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.foods)
  @Field(() => Category, { nullable: true })
  category: Category;
}
