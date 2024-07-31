import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @Column('int')
  release_year: number;

  @Column('text')
  genre: string;

  @Column('text')
  poster: string;

  @Column('text')
  overview: string;
}
