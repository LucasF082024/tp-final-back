import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
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
