import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { environment } from 'src/environments/environment.development';
import { Member } from 'src/models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private apiServiceUrl = environment.apiBaseUrl;
  //Test Local
  tab: Member[] = GLOBAL._DB.members;

  constructor(private http: HttpClient) {}

  addMember(member: Member): Observable<Member> {
    // return this.http.post<Member>(
    //   `${this.apiServiceUrl}/api/v1/members`,
    //   member
    // );
    // console.log('marche très bien');
    this.tab.unshift(member);
    return new Observable((observer) => {
      observer.next(member);
    });
  }
}
