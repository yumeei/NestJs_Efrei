import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 255, nullable: true })
  genre: string;

  @Column()
  releaseDate: string;

  @Column({ nullable: true })
  posterUrl: string;

  @OneToMany(() => Reservation, (reservation) => reservation.movie)
  reservations: Reservation[];
}
