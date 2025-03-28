import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | product[];
  cartItem: number = 0;

  constructor(private router: Router, private product: ProductService) { }
  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("seller") && val.url.includes('seller')) {
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem("seller");
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        } 
        else if (localStorage.getItem("user")) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.product.getCartList(userData.id)
        } 
        else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((item)=>{
      this.cartItem=item.length
    })
  }
  
  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }
  userLogot(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    const element = query.target as HTMLInputElement;
    const searchText = element.value.trim().toLowerCase();

    if (searchText) {
      this.product.searchProducts(searchText).subscribe((result) => {
        this.searchResult = result.filter(item => item.name.toLowerCase().includes(searchText) ||
          (item.category && item.category.toLowerCase().includes(searchText)));
      });
    } else {
      this.searchResult = [];
    }
  }

  hideSearchResult() {
    this.searchResult = undefined;
  }
  submitSearch(value: string) {
    console.log(value);
    this.router.navigate([`search/${value}`]);

  }
  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }

}
