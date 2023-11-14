import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { ProductsService } from '../products.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
})
export class ProductNewComponent implements OnInit {

  category: Category = new Category();
  product: Product = new Product();
  active: string;
  categories: [];
  constructor(private router: Router, private productsService: ProductsService, private categoryService: CategoryService) { }

  // ejecuta esto antes del html
  ngOnInit() {
    this.categoryService.getCategories().subscribe(data =>{
      this.categories = data;
    })
  }

  newProduct(){
    if(this.active){
      this.product.active = true;
    }else{
      this.product.active = false;
    }
    const product = {
      name: this.product.name,
      stock: this.product.stock,
      price: this.product.price,
      active: this.product.active,
      date_added: this.product.date_added,
      category_id: this.category
    }
    this.productsService.newProduct(product);
    this.navigateToHome();
  }

  cancelInsert(){
    this.navigateToHome();
  }

  navigateToHome(){
    this.router.navigate(['/products']);
  }


}
