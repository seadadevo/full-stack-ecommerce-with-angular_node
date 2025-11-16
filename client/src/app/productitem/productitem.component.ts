import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productitem',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css'
})
export class ProductitemComponent implements OnInit{
  @Input() product:any = []
  isInCart: boolean = false;
  private itemID_to_check: number | null = null;
  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    
    if(this.product.id) {
      this.itemID_to_check = this.product;
    } 

    if(this.itemID_to_check){
      this._CartService.isItemInCart(this.itemID_to_check).subscribe(result => {
        this.isInCart = result;
      });
    }

  }

  addToCartList(product:any) {
    this._CartService.addToCart(product)
  }
  removeToCartList(product:any) {
    this._CartService.removeFromCart(product)
  }
}
