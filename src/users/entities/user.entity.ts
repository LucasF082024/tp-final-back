import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role-enum';
import { CommentUser } from 'src/comments/entities/comment.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BASIC,
  })
  role: UserRole;
  
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CommentUser, (comment) => comment.user)
  comments: CommentUser[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
