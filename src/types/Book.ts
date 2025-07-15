export interface IBook {
  _id?: string; 
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: number;
  description?: string;
  copies: number;
  available?: boolean;
  createdAt?: Date;
}

export interface IDoc {
  book: {
    title: string;
    isbn: number;
  },
  totalQuantity: number;
}