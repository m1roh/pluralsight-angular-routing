import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { IProduct } from './product';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class ProductResolverService implements Resolve<IProduct> {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> | Promise<IProduct> | IProduct {
    let id = route.params['id'];
    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`);
      this.router.navigate(['/products']);
      return of(null);
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(
          (product) => {
            if (product) {
              return product;
            }
            console.log(`Product was not found ${id}`);
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
