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
import { CommentUser } from 'src/comments/entities/comment.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly genresService: GenresService,
    private readonly usersService: UsersService,
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

  async createReview(idMovie: number, { text, rating }, { email }) {
    const movie = await this.movieRepository.findOne({
      where: { id: idMovie },
    });
    const user = await this.usersService.findOneByEmail(email);
    const review = new Review();
    review.rating = rating;
    review.text = text;
    review.movie = movie;
    review.user = user;
    return await this.reviewRepository.save(review);
  }

  async findReviews(movieId: number): Promise<any[]> {
    const reviews = await this.reviewRepository.find({
      where: { movie: { id: movieId } },
      relations: ['user'], // Incluye la relación con User
    });
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['genre'], // Incluye la relación con 'genre' si 'genre' es el nombre de la relación en tu entidad Movie
    });
    console.log(movie);
    const genre = movie.genre.description;
    return reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      text: review.text,
      genre: genre,
      userName: review.user?.name, // Incluye el nombre del usuario
    }));
  }

  async findOneById(movieId: number) {
    return this.findMovieWithGenreDescription(movieId);
  }

  async findMovieWithGenreDescription(movieId: number): Promise<any> {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['genre'], // Asumiendo que la relación se llama 'genre'
    });

    if (!movie) {
      throw new Error(`Movie with ID ${movieId} not found.`);
    }

    // Transformar el resultado para devolver solo la descripción del género
    return {
      id: movie.id,
      title: movie.title,
      release_year: movie.release_year,
      poster: movie.poster,
      overview: movie.overview,
      genre: movie.genre ? movie.genre.description : null, // Solo la descripción del género
    };
  }
}
