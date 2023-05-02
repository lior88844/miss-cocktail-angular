import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, take } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { Cocktail, CocktailFilter } from '../models/cocktail.model';
const ENTITY = 'cocktails';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  constructor(private http: HttpClient) {
    const cocktails = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!cocktails || cocktails.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._createCocktails()));
    }
  }

  private _cocktails$ = new BehaviorSubject<Cocktail[]>([]);
  public cocktails$ = this._cocktails$.asObservable();

  private _cocktailFilter$ = new BehaviorSubject<CocktailFilter>({ term: '' });
  public cocktailFilter$ = this._cocktailFilter$.asObservable();

  public getCocktail(cocktailName: String | undefined): Observable<Cocktail> {
    return this.http
      .get<{ drinks: Array<any> }>(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
      )
      .pipe(
        map((res) => res.drinks[0]),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log('err', err);
          return throwError(() => err);
        })
      )
      .pipe(map((res) => this._createCocktail(res)));
  }

  private _createCocktail(res: any) {
    const ingredients: Object[] = [];
    const instructions: string = res.strInstructions;
    const name: string = res.strDrink;
    const img: string = res.strDrinkThumb;
    const price = 0;
    const _id = '';
    for (var i = 0; i < 15; i++) {
      const ingredient = res[`strIngredient${i + 1}`];
      const measure = res[`strMeasure${i + 1}`];
      if (ingredient && measure)
        ingredients.push({ ingredient: ingredient, measure: measure });
    }
    return { ingredients, instructions, name, img, price, _id };
  }

  private _createCocktails() {
    const cocktails: Cocktail[] = [
      {
        _id: '',
        ingredients: [],
        instructions: 'Make the cocktail',
        name: 'Margarita',
        img: '',
        price: 40,
      },
    ];
    return cocktails;
  }
}
