import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './src/entities/user.entity';
import { Movie } from './src/entities/movie.entity';
import { Reservation } from './src/entities/reservation.entity';

import { AuthModule } from './src/auth/auth.module';
import { UsersModule } from './src/users/users.module';
import { MovieModule } from './src/movies/movies.module';
import { ReservationModule } from './src/reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Movie, Reservation],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MovieModule,
    ReservationModule,
  ],
})
export class AppModule { }
