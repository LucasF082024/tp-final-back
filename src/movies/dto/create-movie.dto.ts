import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateMoviesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMovieDto)
  movies: CreateMovieDto[];
}
export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsString()
  password: string;
}
