import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../entities/user.entity';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async createReservation({ userId, movieId, startTime }) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    const movie = await this.movieRepo.findOne({ where: { id: movieId } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    if (!movie) {
      throw new NotFoundException('Film non trouvé');
    }

    const startDate = new Date(startTime);
    if (isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid startTime format.');
    }

    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2);

    const conflict = await this.reservationRepo.findOne({
      where: {
        user,
        startTime: LessThan(endTime),
        endTime: MoreThan(startTime),
      },
    });

    if (conflict) {
      throw new ConflictException("Vous avez déjà une réservation sur cette plage horaire.");
    }

    const reservation = this.reservationRepo.create({
      movieId,
      startTime: startDate,
      endTime,
      userId,
    });
    await this.reservationRepo.save(reservation);

    return {
      message: 'Réservation créée avec succès',
      reservation: {
        id: reservation.id,
        movieId: reservation.movieId,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        userId: reservation.userId,
      },
    };
  }

  async listAllReservations() {
    return this.reservationRepo.find({ relations: ['user', 'movie'] });
  }

  async getReservationById(reservationId: number) {
    return await this.reservationRepo.findOne({ where: { id: reservationId } });
  }

  async listReservationsByUser(userId: number) {
    return this.reservationRepo.find({ where: { user: { id: userId } } });
  }

  async cancelReservation(reservationId: number) {
    const reservation = await this.reservationRepo.findOne({ where: { id: reservationId } });

    if (!reservation) {
      throw new NotFoundException("Réservation non trouvée");
    }

    await this.reservationRepo.remove(reservation);
    return { message: "Réservation annulée avec succès" };
  }
}
