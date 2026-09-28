import { Injectable } from '@angular/core';

export interface ProductItem {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
  Description?: string;
  Category?: string;
  Rating?: number;
  InStock?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsImage: ProductItem[] = [
    {
      ProductId: "p1",
      ProductName: "Coca",
      Price: 100,
      Image: "assets/h1.png",
      Description: "Classic refreshing carbonated soft drink with a crisp, sparkling taste.",
      Category: "Soft Drinks",
      Rating: 4.8,
      InStock: true
    },
    {
      ProductId: "p2",
      ProductName: "Pepsi",
      Price: 300,
      Image: "assets/h2.png",
      Description: "Bold, refreshing cola beverage with a citrusy twist and smooth finish.",
      Category: "Soft Drinks",
      Rating: 4.7,
      InStock: true
    },
    {
      ProductId: "p3",
      ProductName: "Sting",
      Price: 200,
      Image: "assets/h3.png",
      Description: "Energizing strawberry-flavored carbonated boost enriched with Ginseng.",
      Category: "Energy Drinks",
      Rating: 4.9,
      InStock: true
    }
  ];

  constructor() { }

  getProductsWithImages(): ProductItem[] {
    return this.productsImage;
  }

  getProductDetail(id: any): ProductItem | undefined {
    return this.productsImage.find(x => x.ProductId == id);
  }
}
