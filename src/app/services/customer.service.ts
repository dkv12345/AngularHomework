import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

export interface Customer {
  Id: string;
  Name: string;
  Email: string;
  Age: number;
  Image: string;
}

export interface CustomerTypeGroup {
  CustomerTypeId: number;
  CustomterTypeName: string;
  Customers: Customer[];
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly dataUrl = 'assets/data/customers.json';

  // Fallback data in case HTTP request fails
  private fallbackData: CustomerTypeGroup[] = [
    {
      CustomerTypeId: 1,
      CustomterTypeName: "VIP",
      Customers: [
        { Id: "Cus123", Name: "Obama", Email: "obama@gmail.com", Age: 67, Image: "assets/avatars/obama-avatar.png" },
        { Id: "Cus456", Name: "Kim jong Un", Email: "unun@gmail.com", Age: 38, Image: "assets/avatars/unun-avatar.png" },
        { Id: "Cus789", Name: "Putin", Email: "putin@gmail.com", Age: 77, Image: "assets/avatars/putin-avatar.png" }
      ]
    },
    {
      CustomerTypeId: 2,
      CustomterTypeName: "Normal",
      Customers: [
        { Id: "Cus000", Name: "Hồ Cẩm Đào", Email: "hodao@gmail.com", Age: 16, Image: "assets/avatars/hodao-avatar.png" },
        { Id: "Cus111", Name: "Tap Can Binh", Email: "binhbinh@gmail.com", Age: 67, Image: "assets/avatars/binhbinh-avatar.png" }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Fetch customer group data from assets/data/customers.json via HTTP GET
   */
  getCustomerGroups(): Observable<CustomerTypeGroup[]> {
    return this.http.get<CustomerTypeGroup[]>(this.dataUrl).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        console.warn('CustomerService: Failed to fetch data from HTTP endpoint, using fallback.', error);
        return of(this.fallbackData);
      })
    );
  }

  /**
   * Get single customer by ID
   */
  getCustomerById(id: string): Observable<Customer | undefined> {
    return this.getCustomerGroups().pipe(
      map(groups => {
        for (const group of groups) {
          const found = group.Customers.find(c => c.Id === id);
          if (found) return found;
        }
        return undefined;
      })
    );
  }
}
