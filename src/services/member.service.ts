import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, count } from 'rxjs';
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
    // this.tab.unshift(member);
    this.tab = [member, ...this.tab.filter((item) => item.id != member.id)];
    return new Observable((observer) => {
      observer.next(member);
    });
  }

  getMemberById(id: String): Observable<Member> {
    // return this.http.get<Member>(`${this.apiServiceUrl}/api/v1/members/${id}`);

    return new Observable((observer) => {
      observer.next(this.tab.find((item) => item.id == id));
    });
  }

  editMember(member: Member): Observable<Member> {
    return new Observable((observer) => {
      observer.next(member);
    });
  }

  deleteMemberById(id: string): Observable<void> {
    //return this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/delete..'+id);

    this.tab = this.tab.filter((item) => item.id != id);
    return new Observable((observer) => {
      observer.next();
    });
  }

  getAllMembers(): Observable<Member[]> {
    //return this.httpClient.get<Member[]>('http://localhost:9000/MEMBRE-SERVICE/members');

    return new Observable((observer) => {
      observer.next(this.tab);
    });
  }
  count: number = 0;
  tabPub: number[] = [];
  getNbPubMembers(): Observable<number[]> {
    for (let i = 0; i < this.tab.length; i++) {
      this.count = this.tab[i].tab_pub.length;
      this.tabPub.push(this.count);
    }
    return new Observable<number[]>((observer) => observer.next(this.tabPub));
  }
  countTeacher: number = 0;
  countStudent: number = 0;
  tabCount: number[] = [];
  getNbTypeMembers(): Observable<number[]> {
    for (let i = 0; i < this.tab.length; i++) {
      if (this.tab[i].type === 'chercheur') {
        this.countTeacher++;
      } else {
        this.countStudent++;
      }
    }
    this.tabCount.push(this.countTeacher);
    this.tabCount.push(this.countStudent);
    return new Observable<number[]>((observer) => observer.next(this.tabCount));
  }
}
