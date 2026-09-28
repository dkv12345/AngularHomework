import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, ProductItem } from '../services/product.service';

@Component({
  selector: 'app-service-product-image-event',
  templateUrl: './service-product-image-event.component.html',
  styleUrls: ['./service-product-image-event.component.css'],
  standalone: false
})
export class ServiceProductImageEventComponent implements OnInit {
  public products: ProductItem[] = [];
  public filteredProducts: ProductItem[] = [];
  public searchTerm: string = '';
  public sortBy: string = 'default';
  public viewMode: 'table' | 'cards' = 'table';

  constructor(
    private pservice: ProductService,
    private router: Router
  ) {
    this.products = this.pservice.getProductsWithImages();
    this.filteredProducts = [...this.products];
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  viewDetail(f: ProductItem): void {
    this.router.navigate(['service-product-image-event', f.ProductId]);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  setViewMode(mode: 'table' | 'cards'): void {
    this.viewMode = mode;
  }

  applyFilters(): void {
    let result = [...this.products];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.ProductName.toLowerCase().includes(term) ||
        p.ProductId.toLowerCase().includes(term) ||
        (p.Category && p.Category.toLowerCase().includes(term))
      );
    }

    if (this.sortBy === 'price-asc') {
      result.sort((a, b) => a.Price - b.Price);
    } else if (this.sortBy === 'price-desc') {
      result.sort((a, b) => b.Price - a.Price);
    } else if (this.sortBy === 'name-asc') {
      result.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
    }

    this.filteredProducts = result;
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get averagePrice(): number {
    if (this.products.length === 0) return 0;
    const total = this.products.reduce((acc, curr) => acc + curr.Price, 0);
    return Math.round(total / this.products.length);
  }

  get maxPrice(): number {
    return Math.max(...this.products.map(p => p.Price), 0);
  }
}
