import { Component, OnInit } from '@angular/core';
import { CatalogService, CategoryItem } from '../services/catalog.service';

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
  public isDocsOpen: boolean = false;

  constructor(private catalogService: CatalogService) {
    this.categories = this.catalogService.getCategories();
    this.filteredCategories = [...this.categories];
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  toggleDocs(): void {
    this.isDocsOpen = !this.isDocsOpen;
  }

  filterByCategory(cateId: string): void {
    this.selectedCateId = cateId;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = this.categories.map(cat => ({
      ...cat,
      Products: [...cat.Products]
    }));

    if (this.selectedCateId !== 'all') {
      result = result.filter(c => c.Cateid === this.selectedCateId);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result
        .map(cat => {
          const catMatches = 
            cat.CateName.toLowerCase().includes(term) || 
            cat.Cateid.toLowerCase().includes(term);

          if (catMatches) return cat;

          const matchedProducts = cat.Products.filter(p =>
            p.ProductName.toLowerCase().includes(term) ||
            p.ProductId.toLowerCase().includes(term)
          );

          return { ...cat, Products: matchedProducts };
        })
        .filter(cat => cat.Products.length > 0);
    }

    this.filteredCategories = result;
  }

  get totalProducts(): number {
    return this.categories.reduce((sum, cat) => sum + cat.Products.length, 0);
  }
}
