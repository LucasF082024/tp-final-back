import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  released_year: string;

  @Column('text')
  image: string;
}
