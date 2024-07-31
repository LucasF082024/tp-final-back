import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto, CreateMoviesDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
  async createMovies(createMovieDto: CreateMoviesDto) {
    const { movies } = createMovieDto;
    movies.map(async (mov) => {
      const movie = await this.movieRepository.findOneBy({
        title: mov.title,
      });
      if (movie) {
        console.log(`pelicula repetida ${movie.title}`);
        return;
      }
    });
    return 'This action adds bunch of movies';
  }

  async findByName(title: string): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        title: ILike(`${title}%`),
      },
    });
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
