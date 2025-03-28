import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
   addProductMessage:string|undefined;
  constructor(private product: ProductService, private router:Router) { }
  ngOnInit(): void {

  }

  submit(data: product) {
    console.log(data);
    this.product.addProduct(data).subscribe((res)=>{
      console.log(res);
      if(res){
        this.addProductMessage = "Product is successfully added"
      }
    })
    setTimeout(()=>{
      this.addProductMessage = undefined
      this.router.navigate(['seller-home'])
    },2500)
  }

}
