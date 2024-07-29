import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class CommentUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Review, (review) => review.comments)
  review: Review;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
