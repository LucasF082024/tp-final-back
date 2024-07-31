import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class CreateMoviesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMovieDto)
  movies: CreateMovieDto[];
}
export class CreateMovieDto {
  @IsString()
  title: string;

  @IsNumber()
  release_year: number;

  @IsString()
  overview: string;

  @IsString()
  genre: string;

  @IsString()
  poster: string;
}
