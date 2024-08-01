import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMoviesDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { GenresService } from 'src/genres/genres.service';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMoviesDto) {
    return this.moviesService.createMovies(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':movie')
  findOne(@Param('movie') movie: string) {
    return this.moviesService.findByName(movie);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Get(':id')
  @Auth(Role.USER)
  findReviews(@Param('id') id: string) {
    return this.moviesService.findReviews(+id);
  }

  @Get('id/:id')
  findOneById(@Param('id') id: string) {
    return this.moviesService.findOneById(+id);
  }

  @Post(':id')
  @Auth(Role.USER)
  createReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.moviesService.createReview(+id, createReviewDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
