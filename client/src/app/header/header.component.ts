import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLogin: boolean = false;
  cartItemsLength: number = 0;
  favouriteItemsLength: number = 0;
  constructor(private _authService: AuthService, private _CartService: CartService, private _FavouriteService: FavouriteService){}

  ngOnInit(): void {
    this._authService.userData.subscribe({
      next:() => {
        if(this._authService.userData.getValue() != null){
          this.isLogin = true;
        }else {
          this.isLogin = false;
        }
      }
    })

    this._CartService.cartItems$.subscribe({
      next: (itemsList) => {
        this.cartItemsLength = itemsList.length;
      }
    });
    this._FavouriteService.favouriteItems$.subscribe({
      next: (itemsList) => {
        this.favouriteItemsLength = itemsList.length;
      }
    });
  }

  logOut(){
    this._authService.logout()
  }

}
