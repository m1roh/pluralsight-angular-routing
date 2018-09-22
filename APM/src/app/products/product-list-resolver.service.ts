import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IProduct } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class ProductListResolverService implements Resolve<IProduct> {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> | Promise<IProduct> | IProduct {
    let listFilter = route.queryParams['filterBy'] || '';
    let showImage = route.queryParams['showImage'] === 'true';
    /*this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
    this.showImage = this.route.snapshot.queryParams['showImage'] === 'true';
    this.productService.getProducts()
      .subscribe(products => this.products = products,
        error => this.errorMessage = <any>error);*/
    return this.productService.getProducts()
      .pipe(
        map(
          (products) => {
            if (products) {
              return {products, listFilter, showImage};
            }
            console.log(`Products were not found`);
            this.router.navigate(['/products']);
          }
        ),
        catchError(
          (err) => {
            console.log(err);
            this.router.navigate(['/products']);
            return of(null);
          }
        )
      );
  }
}
