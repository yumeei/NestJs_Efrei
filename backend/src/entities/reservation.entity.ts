import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reservations)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
