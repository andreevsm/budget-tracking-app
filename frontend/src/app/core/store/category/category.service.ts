import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CATEGORIES_API } from '@core/constants';
import { Observable } from 'rxjs';
import { ICategory, INewCategory } from './category.interface';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  public loadAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(CATEGORIES_API);
  }

  public add(category: INewCategory): Observable<ICategory> {
    return this.http.post<ICategory>(CATEGORIES_API, category);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(`${CATEGORIES_API}/${id}`);
  }
}
