export interface Cocktail {
  _id: string;
  ingredients: Array<{ ingredient: String; measure: String }>;
  instructions: String;
  name: String;
  img: String;
  price: Number;
}

export interface CocktailFilter {
  term: string;
}
