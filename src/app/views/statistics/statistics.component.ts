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
  spirits: { [key: string]: number } = {};
  ngOnInit() {
    this.customers$ = this.customerService.customers$;
    this.subscription = this.customerService.customers$.subscribe(
      (customers) => {
        this.customers = customers;
        this.loadSpirits();
      }
    );
  }
  loadSpirits() {
    if (!this.customers) return;
    const spirits: { [key: string]: number } = this.customers.reduce(
      (obj: { [key: string]: number }, { spirit }) => {
        if (!obj[spirit]) obj[spirit] = 0;
        obj[spirit]++;
        return obj;
      },
      {}
    );
    this.spirits = spirits;
  }
}
