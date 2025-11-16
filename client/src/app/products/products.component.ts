import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { ProductitemComponent } from '../productitem/productitem.component';
import { SearchPipe } from '../search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductitemComponent, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any = []
  term:string = ''
  paginatedProducts: any[] = [];
  currentPage:number = 1
  productsPerPage:number = 8;
  constructor(private _ProductsService: ProductsService) {}

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response
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
