import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  private apiKey: string;
  private baseUrl: string;

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('TMDB_API_KEY') || '';
    this.baseUrl = this.configService.get<string>('TMDB_BASE_URL') || '';
  }

  async fetchMoviesFromTMDB(): Promise<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies from TMDB:', error);
      throw new Error('Could not fetch movies from TMDB');
    }
  }

  async saveMovieToDatabase(movieData: any): Promise<Movie> {
    const movie = new Movie();
    movie.id = movieData.id;
    movie.title = movieData.title;
    movie.description = movieData.overview;
    movie.releaseDate = movieData.release_date;
    movie.posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    return await this.movieRepo.save(movie);
  }

  async importMoviesFromTMDB(): Promise<void> {
    const movies = await this.fetchMoviesFromTMDB();
    for (const movieData of movies) {
      await this.saveMovieToDatabase(movieData);
    }
    console.log(`${movies.length} movies have been imported to the database.`);
  }

  async getMovies(page = 1, search?: string, sort?: string) {
    let url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=fr-FR&page=${page}`;

    if (search) {
      url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=fr-FR&query=${search}&page=${page}`;
    }

    const response = await firstValueFrom(this.httpService.get(url));

    if (sort === 'title') {
      response.data.results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'release_date') {
      response.data.results.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }

    return response.data;
  }

  async getNowPlaying(page = 1) {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=fr-FR&page=${page}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async searchMovie(query: string, page = 1) {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=fr-FR&query=${query}&page=${page}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getMovieDetails(movieId: number) {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }

  async getGenres() {
    const url = `${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=fr-FR`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
