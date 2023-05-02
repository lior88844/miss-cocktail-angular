import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { CustomerFilter } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'customer-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  constructor(private CustomerService: CustomerService) {}
  destroySubject$ = new Subject<null>();
  filterSubject$ = new Subject();
  customerFilter = {} as CustomerFilter;

  ngOnInit(): void {
    this.CustomerService.customerFilter$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((customerFilter) => {
        this.customerFilter = customerFilter;
      });

    this.filterSubject$
      .pipe(
        takeUntil(this.destroySubject$),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(() => {
        console.log('calling query');
        this.CustomerService.setFilter(this.customerFilter);
      });
  }

  onSetFilter(val: string) {
    // console.log('val:', val)
    // this.customerService.setFilter(this.customerFilter)
    this.filterSubject$.next(val);
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
}
