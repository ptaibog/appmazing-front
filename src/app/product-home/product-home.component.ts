import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css']
})
export class ProductHomeComponent implements OnInit {
  products: any = [];
  constructor(private productsService: ProductsService, private router: Router, public dialog: MatDialog){}

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

  openDeleteDialog(productId: number): void{
    this.dialog.open(ProductDeleteComponent, {data: {productId: productId}});
  }

  
  displayedColumns: string[] = ['id', 'name', 'stock', 'price', 'active', 'date_added', 'category_id', 'actions'];
}
