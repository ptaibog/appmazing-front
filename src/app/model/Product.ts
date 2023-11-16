import { Category } from "./Category";

export class Product{
  name: string;
  stock: number;
  price: number;
  active: boolean;
  estado: string;
  date_added: string;
  category_id: Category;
}
