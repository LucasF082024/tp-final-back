import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  @MaxLength(140)
  text: string;
}
