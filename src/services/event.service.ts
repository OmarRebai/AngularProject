import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { Evenement } from 'src/models/evenement';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  tabEvent: Evenement[] = GLOBAL._DB.events;
  constructor() {}

  addEvent(event: Evenement): Observable<Evenement> {
    // return this.http.post<Member>(
    //   `${this.apiServiceUrl}/api/v1/members`,
    //   member
    // );
    // console.log('marche très bien');
    // this.tab.unshift(member);
    this.tabEvent = [
      event,
      ...this.tabEvent.filter((item) => item.id != event.id),
    ];
    return new Observable((observer) => {
      observer.next(event);
    });
  }

  getEventById(id: String): Observable<Evenement> {
    // return this.http.get<Member>(`${this.apiServiceUrl}/api/v1/members/${id}`);

    return new Observable((observer) => {
      observer.next(this.tabEvent.find((item) => item.id == id));
    });
  }

  editEvent(event: Evenement): Observable<Evenement> {
    return new Observable((observer) => {
      observer.next(event);
    });
  }

  getAllEvents(): Observable<Evenement[]> {
    //return this.httpClient.get<Member[]>('http://localhost:9000/MEMBRE-SERVICE/members');

    return new Observable((observer) => {
      observer.next(this.tabEvent);
    });
  }

  deleteEventById(id: string): Observable<void> {
    //return this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/delete..'+id);

    this.tabEvent = this.tabEvent.filter((item) => item.id != id);
    return new Observable((observer) => {
      observer.next();
    });
  }
}
