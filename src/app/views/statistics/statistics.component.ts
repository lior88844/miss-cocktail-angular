import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  constructor(private customerService: CustomerService) {}
  subscription!: Subscription;
  customers: Customer[] | null = null;
  customers$!: Observable<Customer[]>;
  spirits: Object = {};
  ngOnInit() {
    this.customers$ = this.customerService.customers$;
    console.log('this.customers', this.customers$);
    this.subscription = this.customerService.customers$.subscribe(
      (customers) => {
        this.customers = customers;
      }
    );
  }
}
