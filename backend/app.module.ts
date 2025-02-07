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

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Movie, Reservation],
      // synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    UsersModule,
    MovieModule,
    ReservationModule,
  ],
})
export class AppModule { }
