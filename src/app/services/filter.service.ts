import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMovie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private movies: Subject<IMovie[]> = new Subject<IMovie[]>();
  private filteredMovies: Subject<IMovie[]> = new Subject<IMovie[]>();

  constructor() {}

  public setMovies(movies: IMovie[]): void {
    this.movies.next(movies);
  }

  public setFilteredMovies(filteredMovies: IMovie[]): void {
    this.filteredMovies.next(filteredMovies);
  }

  get movies$(): Observable<IMovie[]> {
    return this.movies;
  }

  get filteredMovies$(): Observable<IMovie[]> {
    return this.filteredMovies;
  }
}
