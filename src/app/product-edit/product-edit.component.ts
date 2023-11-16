import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { CategoryService } from '../category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  category: Category = new Category();
  product: Product = new Product();
  active: string;
  categories: [];

  constructor(private productService: ProductsService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.productService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product = data;
      //cambiar de string a date la fecha
      
      let dateFormated = this.datepipe.transform(this.product.date_added, 'yyyy-MM-dd');
      this.product.date_added = dateFormated;
      if(this.product.category_id == null){
        this.product.category_id = this.category;
      }
    })
    this.categoryService.getCategories().subscribe(categoriesData =>{
      this.categories = categoriesData;
    })
  }

  updateProduct(){
    this.productService.updateProduct(this.product);
    this.navigateDetail();
  }

  cancelUpdate(){
    this.navigateDetail();
  }

  navigateDetail(){
    this.router.navigate(['/product', this.route.snapshot.params['id']]);
  }

}
