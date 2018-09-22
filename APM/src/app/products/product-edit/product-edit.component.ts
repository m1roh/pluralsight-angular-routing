import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Product Edit';
  errorMessage: string;

  product: IProduct;
  private dataIsValid: { [key: string]: boolean} = {};

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => this.onProductRetrieved(data['product'])
    );
  }

  onProductRetrieved(product: IProduct): void {
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(`${this.product.productName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  isValid(path: string): boolean {
    this.validate();

    if (path) {
      return this.dataIsValid[path];
    }

    return (this.dataIsValid &&
      Object.keys(this.dataIsValid)
        .every(d => this.dataIsValid[d] === true)
    );
  }

  saveProduct(): void {
    if (this.isValid(null)) {
      this.productService.saveProduct(this.product)
        .subscribe(
          () => this.onSaveComplete(`${this.product.productName} was saved`),
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigateByUrl('/products');
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // info tab
    this.dataIsValid['info'] = !!(this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode);

    // tags tab
    this.dataIsValid['tags'] = !!(this.product.category &&
      this.product.category.length >= 3);
  }
}
