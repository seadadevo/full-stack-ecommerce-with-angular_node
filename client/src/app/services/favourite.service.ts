import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private favouriteItems = new BehaviorSubject<any[]>([])
  favouriteItems$ = this.favouriteItems.asObservable()
  
  constructor() { 
    const saveItems = localStorage.getItem('favourite');
    if(saveItems){
      const parsedItems = JSON.parse(saveItems);
      this.favouriteItems.next(parsedItems)
    }
  }


  addToFavourite(product:any) {
    const currectList = this.favouriteItems.getValue()
    const isExists = currectList.find(i => i.id === product.id);
    if(!isExists){
      const updatedList = [...currectList, product ]
      this.favouriteItems.next(updatedList);
      localStorage.setItem('favourite', JSON.stringify(updatedList))
    } else {
      console.log('product is aleady exist!', product)
    }
  }
  
  removeFromFavourite(product:any){
    const currectList = this.favouriteItems.getValue()
    const updatedList = currectList.filter(i => i.id !== product.id)
    this.favouriteItems.next(updatedList);
    localStorage.setItem('favourite', JSON.stringify(updatedList))
  }

  isInFavouriteList(id:number): Observable<boolean> {
    return this.favouriteItems$.pipe(
      map(list => {
        return !!list.find(i => i.id === id )
      })
    )
  }
}
