import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto, CreateMoviesDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { ILike, Like, Repository } from 'typeorm';
import { GenresService } from 'src/genres/genres.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly genresService: GenresService,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const { title, release_year, poster, overview, genre } = createMovieDto;

    // Buscar el género en la base de datos
    const genreEntity = await this.genresService.findOneByDesc(genre);
    if (!genreEntity) {
      throw new NotFoundException(`Genre with name "${genre}" not found`);
    }

    // Crear y guardar la nueva película
    const movie = this.movieRepository.create({
      title,
      release_year,
      poster,
      overview,
      genre: genreEntity, // Asociar el género encontrado
    });

    return await this.movieRepository.save(movie);
  }

  async createMovies(createMoviesDto: CreateMoviesDto) {
    const { movies } = createMoviesDto;
    for (const mov of movies) {
      const existingMovie = await this.movieRepository.findOneBy({
        title: mov.title,
      });

      if (existingMovie) continue;

      await this.genresService.create({ description: mov.genre });
      await this.createMovie(mov);
    }
    return 'This action adds bunch of movies';
  }

  async findByName(title: string): Promise<Movie[]> {
    return await this.movieRepository.find({
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
