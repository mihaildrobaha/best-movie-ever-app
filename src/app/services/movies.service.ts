import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from 'src/app/models/movie.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly url: string = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  public getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.url);
  }
}
