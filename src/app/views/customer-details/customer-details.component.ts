import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Customer } from 'src/app/models/customer.model';
import { CocktailService } from 'src/app/services/cocktail.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private cocktailService: CocktailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  subscription!: Subscription;
  customer: Customer | null = null;
  customer$!: Observable<Customer>;
  cocktail: Cocktail | null = null;
  ans$!: string;
  ans = '';

  ngOnInit(): void {
    this.route.params.subscribe({
      next: async (params) => {
        const id = params['id'];
        const customer = await lastValueFrom(this.customerService.getById(id));
        this.customer = customer;
        this.loadCocktail();
      },
      error: (err) => console.log('err:', err),
    });
  }

  loadCocktail() {
    if (!this.customer) return;
    this.subscription = this.cocktailService
      .getCocktail(this.customer.cocktail)
      .subscribe((cocktail) => {
        this.cocktail = cocktail;
      });
  }
  onBack() {
    this.router.navigateByUrl('/customer');
  }
}
