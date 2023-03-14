import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/models/movie.interface';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public movieName: string = '';
  public movies: IMovie[] = [];
  public filteredMovies: IMovie[] = [];
  public genres: Array<number> = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  public selectedGenre: number | null = null;

  constructor(private filterService: FilterService) {}

  public ngOnInit(): void {
    this.filterService.movies$.subscribe((movies: IMovie[]) => {
      this.movies = movies;
    });
    this.filterService.filteredMovies$.subscribe((movies: IMovie[]) => {
      this.filteredMovies = movies;
    });
  }

  private filterByTitle(): IMovie[] {
    if (this.movieName === '') {
      return this.movies;
    } else {
      return this.movies.filter((movie: IMovie) => {
        return movie.name.toLowerCase().includes(this.movieName.toLowerCase());
      });
    }
  }

  private filterByGenre(): IMovie[] {
    if (this.selectedGenre === -1) {
      return this.movies;
    }
    return this.movies.filter((movie) => {
      return movie.genre.some((genre) => genre === this.selectedGenre);
    });
  }

  public filter(): void {
    if (this.selectedGenre === null) {
      this.filterService.setFilteredMovies(this.filterByTitle());
    } else {
      const filteredArray = this.filterByTitle().filter((movie: IMovie) =>
        this.filterByGenre().includes(movie)
      );
      this.filterService.setFilteredMovies(filteredArray);
    }
  }
}
