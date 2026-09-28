import { Injectable } from '@angular/core';

export interface CatalogProduct {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
  Description?: string;
  Volume?: string;
  Origin?: string;
}

export interface CategoryItem {
  Cateid: string;
  CateName: string;
  CateDisplayName?: string;
  Icon?: string;
  Description?: string;
  Products: CatalogProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  datas: CategoryItem[] = [
    {
      Cateid: "cate1",
      CateName: "nuoc ngot",
      CateDisplayName: "Soft Drinks (Nước ngọt)",
      Icon: "🥤",
      Description: "Chilled carbonated soft drinks & energy refreshments",
      Products: [
        {
          ProductId: "p1",
          ProductName: "Coca",
          Price: 100,
          Image: "assets/h1.png",
          Description: "Classic carbonated sparkling beverage",
          Volume: "330ml",
          Origin: "USA"
        },
        {
          ProductId: "p2",
          ProductName: "Pepsi",
          Price: 300,
          Image: "assets/h2.png",
          Description: "Refreshing crisp cola with bold taste",
          Volume: "330ml",
          Origin: "USA"
        },
        {
          ProductId: "p3",
          ProductName: "Sting",
          Price: 200,
          Image: "assets/h3.png",
          Description: "Strawberry energy boost drink with Ginseng",
          Volume: "330ml",
          Origin: "Vietnam"
        }
      ]
    },
    {
      Cateid: "cate2",
      CateName: "Bia",
      CateDisplayName: "Beer (Bia)",
      Icon: "🍺",
      Description: "Premium Vietnamese & International canned beers",
      Products: [
        {
          ProductId: "p4",
          ProductName: "Heleiken",
          Price: 500,
          Image: "assets/h4.png",
          Description: "World premium Dutch lager beer crafted with 100% barley",
          Volume: "330ml",
          Origin: "Netherlands"
        },
        {
          ProductId: "p5",
          ProductName: "333",
          Price: 400,
          Image: "assets/h5.png",
          Description: "Heritage Vietnamese premium canned export lager beer",
          Volume: "330ml",
          Origin: "Vietnam"
        },
        {
          ProductId: "p6",
          ProductName: "Sai Gon",
          Price: 600,
          Image: "assets/h6.png",
          Description: "Extra special spring barley malt beer with smooth finish",
          Volume: "330ml",
          Origin: "Vietnam"
        }
      ]
    }
  ];

  constructor() { }

  getCategories(): CategoryItem[] {
    return this.datas;
  }

  getCategoryById(cateId: string): CategoryItem | undefined {
    return this.datas.find(c => c.Cateid === cateId);
  }
}
