import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { GenresModule } from 'src/genres/genres.module';
import { UsersModule } from 'src/users/users.module';
import { Review } from 'src/reviews/entities/review.entity';
import { Genre } from 'src/genres/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Review, Genre]), // Agrega aquí las entidades Movie y Review
    GenresModule,
    UsersModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
