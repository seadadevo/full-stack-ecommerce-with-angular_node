import { Component } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent {
  favouriteItems:any[] = [];
  constructor(private _FavouriteService:FavouriteService){}

   
  
    ngOnInit(): void {
      this._FavouriteService.favouriteItems$.subscribe((list) => {
        this.favouriteItems = list;
        console.log(this.favouriteItems)
      })
    }
   removeToFavouriteList(product:any) {
    this._FavouriteService.removeFromFavourite(product)
  }
}
