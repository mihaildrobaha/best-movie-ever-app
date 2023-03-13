import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMovie } from 'src/app/models/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() public movie: IMovie | null = null;
  @Input() public disabledLikeButton: boolean = false;
  @Input() public fillLikeButton: boolean = false;
  @Output() public onClickToLike: EventEmitter<number> =
    new EventEmitter<number>();
  @Output() public onOpenDialog: EventEmitter<number> =
    new EventEmitter<number>();

  public imgUrl: string = '';

  public ngOnInit(): void {
    if (this.movie) {
      this.imgUrl = `images/${this.movie.id}.jpeg`;
    }
  }

  public clickToLike(): void {
    if (this.movie) {
      this.onClickToLike.emit(this.movie.id);
    }
  }

  public openDialog(): void {
    if (this.movie) {
      this.onOpenDialog.emit(this.movie.id);
    }
  }
}
