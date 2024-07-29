import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CommentUser } from './comments/entities/comment.entity';
import { Review } from './reviews/entities/review.entity';
import { Movie } from './movies/entities/movie.entity';
import { Genre } from './genres/entities/genre.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: ['dist/**/*.entity.{ts,js}'],
        synchronize: true,
        logging: true,
      }),
    }),
    UsersModule,
    CommentsModule,
    ReviewsModule,
    MoviesModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
