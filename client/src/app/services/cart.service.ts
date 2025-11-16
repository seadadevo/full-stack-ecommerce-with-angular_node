import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([])
  cartItems$ = this.cartItems.asObservable()

  constructor() {
    const saveItems = localStorage.getItem('cartItems');
    if(saveItems){
      const parsedItems = JSON.parse(saveItems);
      this.cartItems.next(parsedItems)
    } 
  }


  addToCart(product: any) {
    const currectList = this.cartItems.getValue();
    const isExists = currectList.find(i => i.id === product.id);
    
    if(!isExists) {
      const updatedList = [...currectList, product]
      this.cartItems.next(updatedList);
      localStorage.setItem('cartItems', JSON.stringify(updatedList))
    } else {
      console.log('product is aleady exist!', product)
    }
  }


   updateQuantity(product: any, qty: number) {
    const currentList = this.cartItems.getValue();

    const updatedList = currentList.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: qty };
      }
      return item;
    });

    this.cartItems.next(updatedList);
    localStorage.setItem('cartItems', JSON.stringify(updatedList));
  }

  removeFromCart(product:any) {
    const currectList = this.cartItems.getValue();
    const updatedList = currectList.filter(i => i.id !== product.id)
    this.cartItems.next(updatedList)
    localStorage.setItem('cartItems', JSON.stringify(updatedList))
  }

  isItemInCart(id:number): Observable<boolean> {
    return this.cartItems$.pipe(
      map(list => {
        return !!list.find(i => i.id === id)
      })
    )
  }
}
