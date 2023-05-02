import { Component, Input, OnInit } from '@angular/core';
import { Cocktail } from 'src/app/models/cocktail.model';

@Component({
  selector: 'cocktail-recipe',
  templateUrl: './cocktail-recipe.component.html',
  styleUrls: ['./cocktail-recipe.component.scss'],
})
export class CocktailRecipeComponent {
  @Input() cocktail!: Cocktail | null;
}
