import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productMessage: string | undefined;
  constructor(private route: ActivatedRoute, private product: ProductService, private router: Router) { }
    ngOnInit(): void {
      let productId = this.route.snapshot.paramMap.get('id');
      console.log(productId);
     productId && this.product.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.productData = data;
        
      })

    }
  submit(data: any) {
    console.log(data);
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((res) => {
      if (res) {
        this.productMessage = "Product is successfully updated";
      }
    })
    setTimeout(()=>{
      this.productMessage = undefined;
      this.router.navigate(['seller-home'])
    },3000)
    
  }
}
