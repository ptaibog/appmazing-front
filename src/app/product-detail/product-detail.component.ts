import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { DatePipe } from '@angular/common';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private router: Router, private datepipe: DatePipe, public dialog: MatDialog) { }

  ngOnInit() {
    this.productsService.getProduct(this.route.snapshot.params['id']).subscribe(data =>{
      this.product = data;
      let dateFormated = this.datepipe.transform(this.product.date_added, 'dd/MM/yyyy');
      this.product.date_added = dateFormated;
    });
  }

  openDeleteDialog(productId: number): void{
    this.dialog.open(ProductDeleteComponent, {data: {productId: productId}})
  }

  editProduct(){
    this.router.navigate(['/product/edit', this.route.snapshot.params['id']]);
  }

  closeProduct(){
    this.router.navigate(['/products']);
  }

}
