import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comment')
export class CommentUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  text: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Review, (review) => review.comment)
  review: Review;
}
