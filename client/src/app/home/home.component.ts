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
  paginatedProducts: any[] = [];
  currentPage:number = 1
  productsPerPage:number = 6;

  constructor(private _ProductsService: ProductsService){}

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log(response)

        this.allCategories = [...new Set(this.products.map((item: any) => item.category))];

        this.updatePaginationView();
      }
    })
  }


  updatePaginationView():void {
    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    this.paginatedProducts = this.products.slice( startIndex, endIndex )
  }

  getTotalPages():number {
    return Math.ceil(this.products.length / this.productsPerPage)
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({length: totalPages}, (_,i) => i + 1)
  }

  goToPage(page: number) {
    if(page < 1 || page > this.getTotalPages()) {
      return;
    }
    this.currentPage = page;
    this.updatePaginationView()
  }

  nextPage(): void {
    if(this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginationView();
    }
  }
  prevPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginationView();
    }
  }
}
