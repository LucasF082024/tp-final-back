import { CommentUser } from 'src/comments/entities/comment.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('float', { nullable: false })
  rating: number;

  @Column('text')
  text: string;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;

  @OneToMany(() => CommentUser, (comment) => comment.review)
  comments: CommentUser[];
}
