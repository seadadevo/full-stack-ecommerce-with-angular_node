import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductitemComponent } from '../productitem/productitem.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ProductitemComponent, CommonModule], 
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  categories = [
    { name: 'electronics', image: 'assets/images/electronic.jpg' },
    { name: 'jewelery', image: 'assets/images/jewerly.jpg' },
    { name: "men's clothing", image: 'assets/images/mens.jpg' },
    { name: "women's clothing", image: 'assets/images/womens.jpg' }
  ];
  
  constructor(private _ProductsService:ProductsService) {}

  productsForCategories: any[] = [];
  activeCategory: string = 'All'; 
  isLoading: boolean = false; 

  ngOnInit(): void {
    this.getAllProducts(); 
  }

  getAllProducts() {
    this.isLoading = true;
    this.activeCategory = 'All'; 
    this._ProductsService.getAllProducts().subscribe((res: any) => {
      this.productsForCategories = res;
      this.isLoading = false;
    });
  }
  
  getProducts(category:string) {
    this.isLoading = true;
    this.activeCategory = category; 
    this._ProductsService.getCategoriesProducts(category).subscribe((res: any) => {
      this.productsForCategories = res;
      this.isLoading = false;
    });
  }
}