import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, filter, map, switchMap, of } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  customer = this.customerService.getEmptyCustomer() as Customer;
  subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(switchMap((params) => this.customerService.getById(params['id'])))
      .subscribe((customer) => (this.customer = customer));
  }

  onSaveCustomer() {
    this.customerService.save(this.customer).subscribe({
      next: () => this.router.navigateByUrl('/customer'),
      error: (err) => console.log('err:', err),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
