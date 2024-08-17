import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CategoryUpdate, CategoryCreate, CategoriesListResponse } from 'src/app/models/categories.model';
import { environment } from 'src/environments/environment.staging';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  

  getCategories(): Observable<CategoriesListResponse> {
    return this.http.get<CategoriesListResponse>(`${this.apiUrl}/Category`);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/Category/${id}`);
  }

  createCategory(category: CategoryCreate): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Category`, category);
  }

  editCategory(id: string, category: CategoryUpdate): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Category/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Category/${id}`);
  }
}
