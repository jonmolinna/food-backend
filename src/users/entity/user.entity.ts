import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  @Field()
  firstName: string;

  @Column({ name: 'last_name' })
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  phone: string;

  @Column()
  @Field()
  dni: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Field()
  createdAt: Date;
}
