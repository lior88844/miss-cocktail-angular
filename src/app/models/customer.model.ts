export interface Customer {
  _id: string;
  name: String;
  spirit: String;
  cocktail: String | undefined;
}

export interface CustomerFilter {
  name: string;
  cocktail: string;
  spirit: string;
}
