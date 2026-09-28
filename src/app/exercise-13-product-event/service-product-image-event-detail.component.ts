import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ProductItem } from '../services/product.service';

@Component({
  selector: 'app-service-product-image-event-detail',
  templateUrl: './service-product-image-event-detail.component.html',
  styleUrls: ['./service-product-image-event-detail.component.css'],
  standalone: false
})
export class ServiceProductImageEventDetailComponent {
  selectedProduct: ProductItem | undefined;
  productId: string | null = null;
  allProducts: ProductItem[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private _fs: ProductService,
    private router: Router
  ) {
    this.allProducts = this._fs.getProductsWithImages();

    this.activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.productId = id;
      if (id != null) {
        this.selectedProduct = this._fs.getProductDetail(id);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['service-product-image-event']);
  }

  switchProduct(id: string): void {
    this.router.navigate(['service-product-image-event', id]);
  }
}
