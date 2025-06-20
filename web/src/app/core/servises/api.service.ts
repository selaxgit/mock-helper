import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IMethod, IOrder, ISection } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  orderMethods(orders: IOrder): Observable<void> {
    return this.httpClient.post<void>(`/api/methods/order`, { orders });
  }

  removeMethod(id: number): Observable<void> {
    return this.httpClient.post<void>(`/api/methods/remove`, { id });
  }

  updateMethod(data: IMethod): Observable<IMethod> {
    data.response = JSON.stringify(data.response);
    return this.httpClient
      .post<IMethod>(`/api/methods/update`, data)
      .pipe(map((response: IMethod) => ({ ...response, response: JSON.parse(response.response) })));
  }

  addMethod(data: Partial<IMethod>): Observable<IMethod> {
    delete data.id;
    data.response = JSON.stringify(data.response);
    return this.httpClient
      .post<IMethod>(`/api/methods/add`, data)
      .pipe(map((response: IMethod) => ({ ...response, response: JSON.parse(response.response) })));
  }

  fetchMethods(sectionId: number | null): Observable<IMethod[]> {
    let params = new HttpParams();
    if (sectionId) {
      params = params.append('sectionId', sectionId);
    }
    return this.httpClient
      .get<IMethod[]>(`/api/methods`, { params })
      .pipe(map((response: IMethod[]) => response.map((i: IMethod) => ({ ...i, response: JSON.parse(i.response) }))));
  }

  orderЫSections(orders: IOrder): Observable<void> {
    return this.httpClient.post<void>(`/api/sections/order`, { orders });
  }

  removeSection(id: number): Observable<void> {
    return this.httpClient.post<void>(`/api/sections/remove`, { id });
  }

  updateSection(data: ISection): Observable<ISection> {
    return this.httpClient.post<ISection>(`/api/sections/update`, data);
  }

  addSection(data: Partial<ISection>): Observable<ISection> {
    delete data.id;
    return this.httpClient.post<ISection>(`/api/sections/add`, data);
  }

  fetchSection(): Observable<ISection[]> {
    return this.httpClient.get<ISection[]>(`/api/sections`);
  }
}
