import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { SearchPipe } from '../search.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductitemComponent } from '../productitem/productitem.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchPipe, CommonModule, FormsModule, ProductitemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  products: any = []
  allCategories: any = []
  term:string = ''
  
  constructor(private _ProductsService: ProductsService){}

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log(response)

        this.allCategories = [...new Set(this.products.map((item: any) => item.category))];
      }
    })
  }

}
