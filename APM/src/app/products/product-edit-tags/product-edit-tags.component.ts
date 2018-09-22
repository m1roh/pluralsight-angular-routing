import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../product';

@Component({
  templateUrl: './product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {
  public errorMessage: string;
  public newTags = '';
  public product: IProduct;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.parent.data.subscribe(data => {
      this.product = data['product'];
    });
  }

  // Add the defined tags
  public addTags(): void {
    let tagArray = this.newTags.split(',');
    this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
    this.newTags = '';
  }

  // Remove the tag from the array of tags.
  public removeTag(idx: number): void {
    this.product.tags.splice(idx, 1);
  }
}
