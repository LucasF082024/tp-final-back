import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

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

  async findAll(us): Promise<any[]> {
    const { email, role } = us;
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
    let reviews;
    if (role !== Role.ADMIN) {
      reviews = await this.reviewRepository.find({
        where: { user: { id: userId } },
        relations: ['movie', 'user'], // Incluye la relación con Movie
      });
    } else {
      reviews = await this.reviewRepository.find({
        relations: ['movie', 'user'],
      });
    }

    // Formatea la respuesta para incluir el nombre de la película y el id
    return reviews.map((review) => ({
      name: review.user.name,
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

  async softRemove(id: number): Promise<void> {
    await this.reviewRepository.delete(id);
  }
}
