export interface Cocktail {
  _id: string;
  ingredients: Array<Object>;
  instructions: String;
  name: String;
  img: String;
  price: Number;
}

export interface CocktailFilter {
  term: string;
}
