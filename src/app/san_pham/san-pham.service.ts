import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SanPham } from './san-pham';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {
  private baseUrl="http://localhost:8080/api/SanPhams"
  
  constructor(private http: HttpClient) { }

  getSanPhams(): Observable<SanPham[]>{
    return this.http.get<SanPham[]>(`${this.baseUrl}`);
  }
}