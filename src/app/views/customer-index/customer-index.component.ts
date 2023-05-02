import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'customer-index',
  templateUrl: './customer-index.component.html',
  styleUrls: ['./customer-index.component.scss'],
})
export class CustomerIndexComponent implements OnInit, OnDestroy {
  constructor(private customerService: CustomerService) {}
  subscription!: Subscription;
  customers: Customer[] | null = null;
  customers$!: Observable<Customer[]>;

  ngOnInit() {
    this.customers$ = this.customerService.customers$;
    this.subscription = this.customerService.customers$.subscribe(
      (customers) => {
        this.customers = customers;
      }
    );
  }

  onRemoveCustomer(customerId: string) {
    console.log('from index');
    this.customerService.remove(customerId).subscribe({
      error: (err) => console.log('err:', err),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
