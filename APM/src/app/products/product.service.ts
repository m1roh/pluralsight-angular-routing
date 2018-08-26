import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IProduct } from './product';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable()
export class ProductService {
  private baseUrl = 'api/products';

  constructor(private http: Http) { }

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
    };
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
               .pipe(
                 map(this.extractData),
                 tap(data => console.log('getProduct: ' + JSON.stringify(data))),
                 catchError(this.handleError),
               );
  }

  deleteProduct(id: number): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
               .pipe(
                 tap(data => console.log('deleteProduct: ' + JSON.stringify(data))),
                 catchError(this.handleError),
               );
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if (product.id === 0) {
      return this.createProduct(product, options);
    }
    return this.updateProduct(product, options);
  }

  private createProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    product.id = undefined;
    return this.http.post(this.baseUrl, product, options)
               .pipe(
                 map(this.extractData),
                 tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                 catchError(this.handleError),
               );
  }

  private updateProduct(product: IProduct, options: RequestOptions): Observable<IProduct> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put(url, product, options)
               .pipe(
                 map(this.extractData),
                 tap(data => console.log('updateProduct: ' + JSON.stringify(data))),
                 catchError(this.handleError),
               );
  }

  private extractData(response: Response) {
    let body = response.json();
    return body.data || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
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
}
