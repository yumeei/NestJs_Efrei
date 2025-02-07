import { Controller, Post, Body, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { Reservation } from '../entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  async createReservation(@Body() reservation: Reservation) {
    return this.reservationService.createReservation(reservation);
  }

  @Get()
  async listAllReservations() {
    return this.reservationService.listAllReservations();
  }

  @Get(':userId')
  async listReservationsByUser(@Param('userId') userId: number) {
    return this.reservationService.listReservationsByUser(userId);
  }

  @Get(':reservationId')
  async getReservationById(@Param('reservationId') reservationId: number) {
    const reservation = await this.reservationService.getReservationById(reservationId);
    if (!reservation) {
      throw new NotFoundException(`La réservation avec l'ID ${reservationId} n'existe pas.`);
    }
    return reservation;
  }

  @Delete(':reservationId')
  async cancelReservation(@Param('reservationId') reservationId: number) {
    return this.reservationService.cancelReservation(reservationId);
  }
}
