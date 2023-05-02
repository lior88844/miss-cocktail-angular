import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from 'src/app/models/cocktail.model';
import { Customer } from 'src/app/models/customer.model';
import { CocktailService } from 'src/app/services/cocktail.service';

@Component({
  selector: 'customer-preview',
  templateUrl: './customer-preview.component.html',
  styleUrls: ['./customer-preview.component.scss'],
})
export class CustomerPreviewComponent implements OnInit {
  constructor(private cocktailService: CocktailService) {}
  subscription!: Subscription;
  cocktail: Cocktail | null = null;
  @Input() customer!: Customer;
  @Output() remove = new EventEmitter<string>();
  ngOnInit() {
    this.subscription = this.cocktailService
      .getCocktail(this.customer.cocktail)
      .subscribe((cocktail) => {
        this.cocktail = cocktail;
      });
  }
}
