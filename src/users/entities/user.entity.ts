import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../common/enums/role.enum';
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

  @Column({ nullable: false, select: false }) //no devuelve la password
  password: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => CommentUser, (comment) => comment.user)
  comments: CommentUser[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
