import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  description: string;
}
