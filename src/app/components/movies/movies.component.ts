import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IMovie } from 'src/app/models/movie.interface';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FilterService } from 'src/app/services/filter.service';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieCardDetailsComponent } from '../movie-card-details/movie-card-details.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public movies: IMovie[] | null = null;
  public favorite: IMovie | null = null;
  public detailsCard: IMovie | null = null;

  constructor(
    private moviesService: MoviesService,
    private favoriteService: FavoriteService,
    private filterService: FilterService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies: IMovie[]) => {
      this.movies = movies;
      this.filterService.setMovies(this.movies);
      this.filterService.setFilteredMovies(this.movies);
      this.filterService.filteredMovies$.subscribe((movies: IMovie[]) => {
        return (this.movies = movies);
      });
      this.favoriteService.serviceId$.subscribe((id: number | null) => {
        if (this.movies) {
          let movie = this.movies.find((movie: IMovie) => {
            return movie.id === id;
          });
          if (movie) {
            this.favorite = movie;
          } else {
            this.favorite = null;
          }
        }
      });
    });
  }

  public clickToLike(id: number) {
    if (id === this.favorite?.id) {
      this.favoriteService.setServiceId(null);
    } else {
      this.favoriteService.setServiceId(id);
    }
  }

  public openDialog(id: number) {
    const dialogConfig: MatDialogConfig<IMovie> = new MatDialogConfig<IMovie>();
    if (this.movies) {
      this.movies.forEach((movie: IMovie) => {
        if (movie.id === id) {
          dialogConfig.data = movie;
          this.dialog.open(MovieCardDetailsComponent, dialogConfig);
        }
      });
    }
  }

  public openDialogFromFavorite(id: number) {
    const dialogConfig: MatDialogConfig<IMovie> = new MatDialogConfig<IMovie>();
    if (this.favorite) {
      dialogConfig.data = this.favorite;
      this.dialog.open(MovieCardDetailsComponent, dialogConfig);
    }
  }
}
