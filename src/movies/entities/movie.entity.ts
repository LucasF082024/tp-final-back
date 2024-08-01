import { Genre } from 'src/genres/entities/genre.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column('int')
  release_year: number;

  @Column('text')
  poster: string;

  @Column('text')
  overview: string;

  @ManyToOne(() => Genre, (genre) => genre.movies)
  genre: Genre;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}
