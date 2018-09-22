import { Injectable } from '@angular/core';

import { IProduct } from './product';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable()
export class ProductService {
  private baseUrl = 'api/products';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get(this.baseUrl)
      .pipe(
        map(this.extractData),
        tap(data => console.log('getProducts: ' + JSON.stringify(data))),
        catchError(this.handleError),
      );
  }

  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializeProduct());
    }

    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .pipe(
        map(this.extractData),
        tap(data => console.log('getProduct: ' + JSON.stringify(data))),
        catchError(this.handleError),
      );
  }

  deleteProduct(id: number): Observable<HttpResponse<void>> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + JSON.stringify(data))),
        catchError(this.handleError),
      );
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (product.id === 0) {
      return this.createProduct(product, { headers });
    }
    return this.updateProduct(product, { headers });
  }

  initializeProduct(): IProduct {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      category: null,
      tags: [],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }

  private createProduct(product: IProduct, { headers }): Observable<IProduct> {
    product.id = undefined;
    return this.http.post(this.baseUrl, product, { headers })
      .pipe(
        map(this.extractData),
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError),
      );
  }

  private updateProduct(product: IProduct, { headers }): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put(url, product, { headers })
      .pipe(
        map(this.extractData),
        tap(data => console.log('updateProduct: ' + JSON.stringify(data))),
        catchError(this.handleError),
      );
  }

  private extractData(response: HttpResponse<any>) {
    return response || {};
  }

  private handleError(error: HttpResponse<any>): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return throwError(error || 'Server error');
  }
}
