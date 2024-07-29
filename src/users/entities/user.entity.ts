import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../user-role-enum';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BASIC, // Valor por defecto, si se desea
  })
  role: UserRole;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
