import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productDetails:any = []
  constructor(private _productService: ProductsService,private __ActivatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let {id} = this.__ActivatedRoute.snapshot.params;
    this._productService.getProductDetails(id).subscribe({
      next:(data) => {
        this.productDetails = data
        console.log(this.productDetails)
      }
    })
  }
}
