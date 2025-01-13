import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getData(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${url}`);
  }

  postData(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${url}`, data);
  }

  postSecure(url: string,data: any){
    const token = localStorage.getItem("access_token");
    return this.http.post<any>(`${this.baseUrl}/${url}`, data,{
      headers: {
          ['Authorization']: 'Bearer '+token
      },
      withCredentials: true,
      observe: "body"
    });

  }

  getSecure(url: string){
    const token = localStorage.getItem("access_token");
    return this.http.get<any>(`${this.baseUrl}/${url}`,{
      headers: {
          ['Authorization']: 'Bearer '+token
      },
      withCredentials: true,
      observe: "body",
    });
  }

}
