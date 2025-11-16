import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

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
  constructor(private _authService: AuthService, private _CartService: CartService){}

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
  }

  logOut(){
    this._authService.logout()
  }

}
