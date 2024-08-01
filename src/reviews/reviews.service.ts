import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // private readonly genresService: GenresService,
  ) {}
  create(createReviewDto: CreateReviewDto) {
    return this.reviewRepository.save(createReviewDto);
  }

  async findAll({ email }: { email: string }): Promise<any[]> {
    // Encuentra el usuario por correo electrónico
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error(`Usuario con correo ${email} no encontrado.`);
    }

    // Obtiene el ID del usuario
    const userId = user.id;

    // Busca todas las reseñas asociadas con el ID del usuario
    const reviews = await this.reviewRepository.find({
      where: { user: { id: userId } },
      relations: ['movie'], // Incluye la relación con Movie
    });

    // Formatea la respuesta para incluir el nombre de la película y el id
    return reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      review: review.text,
      movieId: review.movie.id,
      Title: review.movie.title,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOneBy({ id });
    return this.reviewRepository.save({ ...review, ...updateReviewDto });
  }

  async remove(id: number) {
    const review = await this.reviewRepository.findOneBy({ id });
    return `This action removes a #${id} review`;
  }
}
