import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private serviceId: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);

  get serviceId$(): Observable<number | null> {
    return this.serviceId;
  }

  constructor() {
    const serviceIdFromStorage = localStorage.getItem('serviceId');
    if (serviceIdFromStorage) {
      this.setServiceId(+serviceIdFromStorage);
    }
  }

  public setServiceId(id: number | null): void {
    this.serviceId.next(id);
    if (id) {
      localStorage.setItem('serviceId', id.toString());
    } else {
      localStorage.removeItem('serviceId');
    }
  }
}
