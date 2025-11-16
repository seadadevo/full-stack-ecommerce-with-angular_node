import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems:any[] = [];
  constructor(private _CartService:CartService) {}

  ngOnInit(): void {
    this._CartService.cartItems$.subscribe((list) => {
      this.cartItems = list;
      console.log(this.cartItems)
    })
  }


  updateQuantity(item: any, newQty: number) {
  this._CartService.updateQuantity(item, newQty);
}

   getAllPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
  }

  removeItem(item: any) {
    this._CartService.removeFromCart(item)
  }
}
