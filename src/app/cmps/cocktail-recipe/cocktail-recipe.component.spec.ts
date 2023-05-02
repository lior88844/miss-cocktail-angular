import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailRecipeComponent } from './cocktail-recipe.component';

describe('CocktailRecipeComponent', () => {
  let component: CocktailRecipeComponent;
  let fixture: ComponentFixture<CocktailRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocktailRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
