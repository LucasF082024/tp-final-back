import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

Entity('user');
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  user_name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
