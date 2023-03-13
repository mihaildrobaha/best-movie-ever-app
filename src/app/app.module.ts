import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieCardComponent } from './components/movies/movie-card/movie-card.component';
import { FavoriteMovieComponent } from './components/movies/favorite-movie/favorite-movie.component';
import { GenrePipe } from './pipes/genre.pipe';
import { MovieCardDetailsComponent } from './components/movie-card-details/movie-card-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCardComponent,
    FavoriteMovieComponent,
    GenrePipe,
    MovieCardDetailsComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent],
})
export class AppModule {}
