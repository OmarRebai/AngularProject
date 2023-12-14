import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from 'src/app/app-config';
import { environment } from 'src/environments/environment.development';
import { Tool } from 'src/models/tool';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private apiServiceUrl = environment.apiBaseUrl;
  //Test Local
  tab: Tool[] = GLOBAL._DB.tools;

  constructor(private http: HttpClient) {}

  addTool(Tool: Tool): Observable<Tool> {
    // return this.http.post<Tool>(
    //   `${this.apiServiceUrl}/api/v1/Tools`,
    //   Tool
    // );
    // console.log('marche très bien');
    // this.tab.unshift(Tool);
    this.tab = [Tool, ...this.tab.filter((item) => item.id != Tool.id)];
    return new Observable((observer) => {
      observer.next(Tool);
    });
  }

  getToolById(id: String): Observable<Tool> {
    // return this.http.get<Tool>(`${this.apiServiceUrl}/api/v1/Tools/${id}`);

    return new Observable((observer) => {
      observer.next(this.tab.find((item) => item.id == id));
    });
  }

  editTool(Tool: Tool): Observable<Tool> {
    return new Observable((observer) => {
      observer.next(Tool);
    });
  }

  deleteToolById(id: string): Observable<void> {
    //return this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/delete..'+id);

    this.tab = this.tab.filter((item) => item.id != id);
    return new Observable((observer) => {
      observer.next();
    });
  }

  getAllTools(): Observable<Tool[]> {
    //return this.httpClient.get<Tool[]>('http://localhost:9000/MEMBRE-SERVICE/Tools');

    return new Observable((observer) => {
      observer.next(this.tab);
    });
  }
}
