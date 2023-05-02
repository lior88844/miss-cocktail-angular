import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private CustomerService: CustomerService) {}

  ngOnInit(): void {
    this.CustomerService.query().subscribe({
      error: (err) => console.log('err:', err),
    });
  }
}
