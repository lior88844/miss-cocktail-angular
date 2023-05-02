export interface Customer {
  _id: string;
  name: String;
  spirit: any;
  cocktail: String | undefined;
}

export interface CustomerFilter {
  name: string;
  cocktail: string;
  spirit: string;
}
