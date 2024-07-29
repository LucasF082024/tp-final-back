import { CommentUser } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('number')
  rating: number;

  @Column('text')
  text: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @OneToMany(() => CommentUser, (comment) => comment.review)
  comment: CommentUser[];
}
