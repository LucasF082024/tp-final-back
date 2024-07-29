import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role-enum';
import { CommentUser } from 'src/comments/entities/comment.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity('user')
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
    default: UserRole.BASIC,
  })
  role: UserRole;

  @OneToMany(() => CommentUser, (comment) => comment.user)
  comments: CommentUser[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
