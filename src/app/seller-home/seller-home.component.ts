import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[]
  productMessage: string | undefined
  deleteIcon = faTrash;
  editIcon =faEdit
  
  constructor(private product: ProductService) { }
  ngOnInit(): void {
  this.List();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.productMessage = "Product is successfully deleted"
        this.List();
      }

    })
    setTimeout(() => {
      this.productMessage = undefined
    }, 3000)
  }

  List() {
    this.product.productList().subscribe((res) => {
      console.log(res);
      this.productList = res
    })
  }

}
