import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
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
  async listReservations(@Param('userId') userId: number) {
    return this.reservationService.listReservation(userId);
  }

  @Delete(':reservationId')
  async cancelReservation(@Param('reservationId') reservationId: number) {
    return this.reservationService.cancelReservation(reservationId);
  }
}
