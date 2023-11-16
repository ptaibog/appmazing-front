import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  products: any = [];
  constructor(private productsService: ProductsService, private router: Router){}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data =>{
      this.products = data;
    })
  }
  openDetailForm(row: any){
    this.router.navigate(['/product', row.id]);
  }

  editProductDetail(product: any){
    this.router.navigate(['/product/edit', product])
  }

  
  displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'active', 'date_added', 'category_id', 'actions'];
}
