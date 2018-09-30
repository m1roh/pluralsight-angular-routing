import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService } from './product-resolver.service';
import { ProductListResolverService } from './product-list-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ProductGuardService } from './product-guard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: '',
        component: ProductListComponent,
        resolve: { data: ProductListResolverService },
      },
      {
        path: ':id',
        component: ProductDetailComponent,
        pathMatch: 'full',
        resolve: { product: ProductResolverService }
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        canDeactivate: [ProductGuardService],
        resolve: { product: ProductResolverService },
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: ProductEditInfoComponent
          },
          {
            path: 'tags',
            component: ProductEditTagsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}
