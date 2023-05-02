import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { Customer, CustomerFilter } from '../models/customer.model';
const ENTITY = 'customers';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {
    const customers = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!customers || customers.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createCustomers()));
    }
  }

  private _customers$ = new BehaviorSubject<Customer[]>([]);
  public customers$ = this._customers$.asObservable();

  private _customerFilter$ = new BehaviorSubject<CustomerFilter>({
    name: '',
    spirit: '',
    cocktail: '',
  });
  public customerFilter$ = this._customerFilter$.asObservable();

  public query() {
    return from(storageService.query(ENTITY)).pipe(
      tap((customers) => {
        const filterBy = this._customerFilter$.value;
        customers = customers.filter((customer) =>
          customer.name.toLowerCase().includes(filterBy.name.toLowerCase())
        );
        this._customers$.next(customers);
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public getCustomer(customerName = 'martini') {
    return this.http
      .get<{ data: any }>(
        `https://www.thecustomerdb.com/api/json/v1/1/search.php?s=${customerName}`
      )
      .pipe(
        map((res) => res.data.drinks[0]),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log('err', err);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        const customer = this._createCustomer(res);
      });
  }

  private _createCustomer(res: any) {
    const ingredients = [];
    const instructions = res.strInstructions;
    const name = res.strDrink;
    const img = res.strDrinkThumb;
    for (var i = 0; i < 15; i++) {
      const ingredient = res[`strIngredient${i + 1}`];
      const measure = res[`strMeasure${i + 1}`];
      if (ingredient && measure)
        ingredients.push({ ingredient: ingredient, measure: measure });
    }
    return { ingredients, instructions, name, img };
  }

  public remove(customerId: string) {
    return from(storageService.remove(ENTITY, customerId)).pipe(
      tap(() => {
        const customers = this._customers$.value;
        const customerIdx = customers.findIndex(
          (customer) => customer._id === customerId
        );
        customers.splice(customerIdx, 1);
        this._customers$.next([...customers]);
        return customerId;
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  public getById(customerId: string): Observable<Customer> {
    return from(storageService.get(ENTITY, customerId)).pipe(
      retry(1),
      catchError(this._handleError)
    );
  }

  public getEmptyCustomer() {
    return { _id: '', name: '', cocktail: '', spirit: '' };
  }

  public save(customer: Customer) {
    return customer._id ? this._edit(customer) : this._add(customer);
  }

  public setFilter(customerFilter: CustomerFilter) {
    this._customerFilter$.next({ ...customerFilter });
    this.query().subscribe();
  }

  private _add(customer: Customer) {
    return from(storageService.post(ENTITY, customer)).pipe(
      tap((newCustomer) => {
        const customers = this._customers$.value;
        customers.push(newCustomer);
        this._customers$.next([...customers]);
        return newCustomer;
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _edit(customer: Customer) {
    return from(storageService.put(ENTITY, customer)).pipe(
      tap((updatedCustomer) => {
        const customers = this._customers$.value;
        const customerIdx = customers.findIndex(
          (_customer) => _customer._id === customer._id
        );
        customers.splice(customerIdx, 1, updatedCustomer);
        this._customers$.next([...customers]);
        return updatedCustomer;
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  private _createCustomers() {
    const customers: Customer[] = [
      {
        _id: '5a56640269f443a5d64b32ca',
        name: 'Ochoa Hyde',
        spirit: 'Vodka',
        cocktail: 'Bellini Martini',
      },
      {
        _id: '5a5664025f6ae9aa24a99fde',
        name: 'Hallie Mclean',
        spirit: 'Gin',
        cocktail: 'Gin And Tonic',
      },
      {
        _id: '5a56640252d6acddd183d319',
        name: 'Parsons Norris',
        spirit: 'Whiskey',
        cocktail: 'Old Fashioned',
      },
      {
        _id: '5a566402ed1cf349f0b47b4d',
        name: 'Rachel Lowe',
        spirit: 'rum',
        cocktail: 'Negroni',
      },
      {
        _id: '5a566402abce24c6bfe4699d',
        name: 'Dominique Soto',
        spirit: 'tequila',
        cocktail: 'Daiquiri',
      },
      {
        _id: '5a566402a6499c1d4da9220a',
        name: 'Shana Pope',
        spirit: 'tequila',
        cocktail: 'Dry Martini',
      },
      {
        _id: '5a566402f90ae30e97f990db',
        name: 'Faulkner Flores',
        spirit: 'vodka',
        cocktail: 'Manhattan',
      },
      {
        _id: '5a5664027bae84ef280ffbdf',
        name: 'Holder Bean',
        spirit: 'vodka',
        cocktail: 'Aperol Spritz',
      },
      {
        _id: '5a566402e3b846c5f6aec652',
        name: 'Rosanne Shelton',
        spirit: 'gin',
        cocktail: 'Mojito',
      },
      {
        _id: '5a56640272c7dcdf59c3d411',
        name: 'Pamela Nolan',
        spirit: 'rum',
        cocktail: 'Bloody Mary',
      },
      {
        _id: '5a5664029a8dd82a6178b15f',
        name: 'Roy Cantu',
        spirit: 'tequila',
        cocktail: 'Moscow Mule',
      },
      {
        _id: '5a5664028c096d08eeb13a8a',
        name: 'Ollie Christian',
        spirit: 'rum',
        cocktail: 'Penicillin',
      },
      {
        _id: '5a5664026c53582bb9ebe9d1',
        name: 'Nguyen Walls',
        spirit: 'Whiskey',
        cocktail: 'Whiskey Sour',
      },
      {
        _id: '5a56640298ab77236845b82b',

        name: 'Glenna Santana',
        spirit: 'vodka',
        cocktail: 'Mai Tai',
      },
      {
        _id: '5a56640208fba3e8ecb97305',
        name: 'Malone Clark',
        spirit: 'Whiskey',
        cocktail: 'Boulevardier',
      },
      {
        _id: '5a566402abb3146207bc4ec5',
        name: 'Floyd Rutledge',
        spirit: 'vodka',
        cocktail: 'Amaretto Sour',
      },
      {
        _id: '5a56640298500fead8cb1ee5',
        name: 'Grace James',
        spirit: 'Gin',
        cocktail: 'Gin Fizz',
      },
      {
        _id: '5a56640243427b8f8445231e',
        name: 'Tanner Gates',
        spirit: 'rum',
        cocktail: 'Bellini',
      },
      {
        _id: '5a5664025c3abdad6f5e098c',
        name: 'Lilly Conner',
        spirit: 'rum',
        cocktail: 'Pina Colada',
      },
    ];
    return customers;
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err);
    return throwError(() => err);
  }

  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
