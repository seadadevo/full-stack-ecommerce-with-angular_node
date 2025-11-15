import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], term: string): any[] {
     if (!Array.isArray(products)) return [];
  if (!term) return products;

  term = term.toLowerCase();

  return products.filter(product =>
    product.title.toLowerCase().includes(term)
  );
  }

}
