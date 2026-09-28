import { Component, OnInit } from '@angular/core';
import { CatalogService, CategoryItem, CatalogProduct } from '../services/catalog.service';

@Component({
  selector: 'app-service-product-catalog',
  templateUrl: './service-product-catalog.component.html',
  styleUrls: ['./service-product-catalog.component.css'],
  standalone: false
})
export class ServiceProductCatalogComponent implements OnInit {
  public categories: CategoryItem[] = [];
  public filteredCategories: CategoryItem[] = [];
  public selectedCateId: string = 'all';
  public searchTerm: string = '';
  public viewMode: 'nested-table' | 'catalog-cards' = 'nested-table';

  constructor(private catalogService: CatalogService) {
    this.categories = this.catalogService.getCategories();
    this.filteredCategories = [...this.categories];
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  filterByCategory(cateId: string): void {
    this.selectedCateId = cateId;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  setViewMode(mode: 'nested-table' | 'catalog-cards'): void {
    this.viewMode = mode;
  }

  applyFilters(): void {
    let result = this.categories.map(cat => ({
      ...cat,
      Products: [...cat.Products]
    }));

    // Filter by selected category
    if (this.selectedCateId !== 'all') {
      result = result.filter(c => c.Cateid === this.selectedCateId);
    }

    // Filter by search query across products or categories
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result
        .map(cat => {
          const catMatches = 
            cat.CateName.toLowerCase().includes(term) || 
            (cat.CateDisplayName && cat.CateDisplayName.toLowerCase().includes(term)) ||
            cat.Cateid.toLowerCase().includes(term);

          if (catMatches) {
            return cat;
          }

          const matchedProducts = cat.Products.filter(p =>
            p.ProductName.toLowerCase().includes(term) ||
            p.ProductId.toLowerCase().includes(term) ||
            (p.Description && p.Description.toLowerCase().includes(term))
          );

          return {
            ...cat,
            Products: matchedProducts
          };
        })
        .filter(cat => cat.Products.length > 0);
    }

    this.filteredCategories = result;
  }

  get totalCategories(): number {
    return this.categories.length;
  }

  get totalProducts(): number {
    return this.categories.reduce((sum, cat) => sum + cat.Products.length, 0);
  }

  get averagePrice(): number {
    let count = 0;
    let sum = 0;
    for (const cat of this.categories) {
      for (const p of cat.Products) {
        sum += p.Price;
        count++;
      }
    }
    return count > 0 ? Math.round(sum / count) : 0;
  }
}
