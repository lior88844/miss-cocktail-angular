import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  @Input() customers!: Customer[] | null;
  @Output() remove = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('customers', this.customers);
  }
}
