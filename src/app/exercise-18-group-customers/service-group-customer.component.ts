import { Component, OnInit } from '@angular/core';
import { CustomerService, CustomerTypeGroup, Customer } from '../services/customer.service';

@Component({
  selector: 'app-service-group-customer',
  templateUrl: './service-group-customer.component.html',
  styleUrls: ['./service-group-customer.component.css'],
  standalone: false
})
export class ServiceGroupCustomerComponent implements OnInit {
  public customerGroups: CustomerTypeGroup[] = [];
  public filteredGroups: CustomerTypeGroup[] = [];
  public isLoading: boolean = true;
  public errorMessage: string | null = null;
  public searchTerm: string = '';
  public selectedTypeFilter: number | 'all' = 'all';
  public isDocsOpen: boolean = false;
  public selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomerData();
  }

  toggleDocs(): void {
    this.isDocsOpen = !this.isDocsOpen;
  }

  loadCustomerData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.customerService.getCustomerGroups().subscribe({
      next: (data) => {
        this.customerGroups = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi tải dữ liệu khách hàng:', err);
        this.errorMessage = 'Không thể tải dữ liệu qua dịch vụ HTTP. Đang chuyển sang dữ liệu dự phòng...';
        this.isLoading = false;
      }
    });
  }

  filterByType(typeId: number | 'all'): void {
    this.selectedTypeFilter = typeId;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  openCustomerModal(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  closeCustomerModal(): void {
    this.selectedCustomer = null;
  }

  applyFilters(): void {
    let result = this.customerGroups.map(g => ({
      ...g,
      Customers: [...g.Customers]
    }));

    if (this.selectedTypeFilter !== 'all') {
      result = result.filter(g => g.CustomerTypeId === this.selectedTypeFilter);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result
        .map(group => {
          const groupNameMatches = group.CustomterTypeName.toLowerCase().includes(term);
          if (groupNameMatches) return group;

          const matchedCustomers = group.Customers.filter(c =>
            c.Name.toLowerCase().includes(term) ||
            c.Id.toLowerCase().includes(term) ||
            c.Email.toLowerCase().includes(term) ||
            c.Age.toString().includes(term)
          );

          return { ...group, Customers: matchedCustomers };
        })
        .filter(group => group.Customers.length > 0);
    }

    this.filteredGroups = result;
  }

  get totalCustomers(): number {
    return this.customerGroups.reduce((sum, g) => sum + g.Customers.length, 0);
  }

  get totalVipCustomers(): number {
    const vipGroup = this.customerGroups.find(g => g.CustomerTypeId === 1);
    return vipGroup ? vipGroup.Customers.length : 0;
  }

  get totalNormalCustomers(): number {
    const normalGroup = this.customerGroups.find(g => g.CustomerTypeId === 2);
    return normalGroup ? normalGroup.Customers.length : 0;
  }
}
