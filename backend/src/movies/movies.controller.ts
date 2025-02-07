import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movies.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Get()
  async getMovies() {
    return this.movieService.getMovies();
  }

  @Get('import')
  async importMovies() {
    await this.movieService.importMoviesFromTMDB();
    return 'Movies imported successfully!';
  }

  @Get('now_playing')
  async getNowPlayingMovies() {
    return this.movieService.getNowPlaying();
  }

  @Get('search/movie')
  async searchMovie(@Query('query') query: string) {
    return this.movieService.searchMovie(query);
  }

  @Get(':movie_id')
  async getMovieDetails(@Param('movie_id') movieId: number) {
    return this.movieService.getMovieDetails(movieId);
  }

  @Get('genre/movie/list')
  async getGenres() {
    return this.movieService.getGenres();
  }
}
