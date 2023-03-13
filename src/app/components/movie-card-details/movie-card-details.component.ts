import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMovie } from 'src/app/models/movie.interface';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-movie-card-details',
  templateUrl: './movie-card-details.component.html',
  styleUrls: ['./movie-card-details.component.scss'],
})
export class MovieCardDetailsComponent implements OnInit {
  public imgUrl: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public movie: IMovie | null = null,
    private favoriteService: FavoriteService
  ) {}

  public id: number | null = null;

  ngOnInit(): void {
    if (this.movie?.id) {
      this.imgUrl = `images/${this.movie.id}.jpeg`;
    }
    this.favoriteService.serviceId$.subscribe((id: number | null) => {
      if (this.movie?.id === id) {
        this.id = id;
      } else {
        this.id = null;
      }
    });
  }

  public addToFavorite(): void {
    if (this.movie?.id) {
      this.favoriteService.setServiceId(this.movie?.id);
    }
  }

  public removeFromFavorite(): void {
    if (this.movie?.id === this.id) {
      this.favoriteService.setServiceId(null);
    }
  }
}
