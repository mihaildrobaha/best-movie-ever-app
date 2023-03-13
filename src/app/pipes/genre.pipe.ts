import { Pipe, PipeTransform } from '@angular/core';

type Genres = Record<number | string, string>;

@Pipe({
  name: 'genre',
})
export class GenrePipe implements PipeTransform {
  transform(numbers: number[] | number): string[] | string {
    if (!numbers) return [];

    const genres: Genres = {
      '-1': 'Все',
      1: 'драма',
      2: 'биография',
      3: 'история',
      4: 'фэнтези',
      5: 'приключения',
      6: 'боевик',
      7: 'мультфильм',
      8: 'комедия',
      9: 'триллер',
      10: 'детектив',
      11: 'фантастика',
    };

    if (typeof numbers === 'number') {
      return genres[numbers];
    }

    return numbers.map(
      (number: number | string) => ' ' + genres[number] || 'неизвестный жанр'
    );
  }
}
