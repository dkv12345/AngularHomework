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
  public viewMode: 'table' | 'cards' = 'table';
  public selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomerData();
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
        console.error('Error fetching customer data:', err);
        this.errorMessage = 'Failed to load customer data via HTTP service. Please try again.';
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

  setViewMode(mode: 'table' | 'cards'): void {
    this.viewMode = mode;
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

    // Filter by customer type
    if (this.selectedTypeFilter !== 'all') {
      result = result.filter(g => g.CustomerTypeId === this.selectedTypeFilter);
    }

    // Filter by search query
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

          return {
            ...group,
            Customers: matchedCustomers
          };
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

  get averageAge(): number {
    const allCustomers = this.customerGroups.flatMap(g => g.Customers);
    if (allCustomers.length === 0) return 0;
    const totalAge = allCustomers.reduce((sum, c) => sum + c.Age, 0);
    return Math.round(totalAge / allCustomers.length);
  }
}
