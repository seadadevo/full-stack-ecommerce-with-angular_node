import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isLogin: boolean = false;
  constructor(private _authService: AuthService){}

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
  }

  logOut(){
    this._authService.logout()
  }

}
