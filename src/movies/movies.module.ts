import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { GenresModule } from 'src/genres/genres.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), GenresModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
