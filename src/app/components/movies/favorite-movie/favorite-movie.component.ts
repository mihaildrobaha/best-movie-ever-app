import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from 'src/app/models/movie.interface';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite-movie',
  templateUrl: './favorite-movie.component.html',
  styleUrls: ['./favorite-movie.component.scss'],
})
export class FavoriteMovieComponent implements OnInit {
  @Input() public movie: IMovie | null = null;
  @Input() public fillLikeButton: boolean = false;
  @Output() public onOpenDialogFromFavorite: EventEmitter<number> =
    new EventEmitter<number>();

  constructor(private favoriteService: FavoriteService) {}

  public ngOnInit(): void {}

  public removeFromFavorites(id: number): void {
    if (this.movie) {
      this.favoriteService.setServiceId(null);
    }
  }

  public openDialog(id: number): void {
    this.onOpenDialogFromFavorite.emit(id);
  }
}
