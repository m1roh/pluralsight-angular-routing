import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { Observable } from 'rxjs';

@Injectable()
export class ProductGuardService implements CanDeactivate<ProductEditComponent> {
  canDeactivate(component: ProductEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (component.isDirty) {
      let productName = component.product.productName || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName} ?`);
    }
    return true;
  }

}
