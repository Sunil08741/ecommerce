import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: signUp) {
    this.http.post("http://localhost:3000/seller", data,
      { observe: 'response' }
    ).subscribe((res) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(res.body));
      this.router.navigate(['seller-home']);
    });
  }
  realoadSeller(){
    if(localStorage.getItem("seller")){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((res: any) => {
      console.warn(res);
      if(res && res.body && res.body.length===1){
        localStorage.setItem('seller', JSON.stringify(res.body));
      this.router.navigate(['seller-home']);
      }else{
        console.warn("Login Failed");
        this.isLoginError.emit(true);
      }
    });
  }
}
