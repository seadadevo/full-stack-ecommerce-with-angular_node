import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';

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
  isInFavourite: boolean = false;
  private itemID_to_check: number | null = null;
  private itemID_to_check_favorite: number | null = null;
  constructor(private _CartService: CartService, private _FavouriteService:FavouriteService) {}
  ngOnInit(): void {
    
    if(this.product.id) {
      this.itemID_to_check = this.product.id;
      this.itemID_to_check_favorite = this.product.id;
    } 

    if(this.itemID_to_check){
      this._CartService.isItemInCart(this.itemID_to_check).subscribe(result => {
        this.isInCart = result;
      });
    }
    if(this.itemID_to_check_favorite !== null){
  this._FavouriteService.isInFavouriteList(this.itemID_to_check_favorite)
    .subscribe(result => {
      this.isInFavourite = result;
    });
}

  }

  addToCartList(product:any) {
    this._CartService.addToCart(product)
  }
  removeToCartList(product:any) {
    this._CartService.removeFromCart(product)
  }
  addToFavouriteList(product:any) {
    this._FavouriteService.addToFavourite(product)
  }
 
}
