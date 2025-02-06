import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../entities/reservation.entity';
import { ReservationService } from './reservations.service';
import { ReservationController } from './reservations.controller';
import { User } from '../entities/user.entity';
import { Movie } from '../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User, Movie])],
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [TypeOrmModule],
})
export class ReservationModule { }
