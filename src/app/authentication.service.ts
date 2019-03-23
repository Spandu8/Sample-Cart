import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }
  private loggedIn = new BehaviorSubject<boolean>(
    JSON.parse(sessionStorage.getItem('isLoggedIn')));

  private isAdmins = new BehaviorSubject<boolean>(
    JSON.parse(sessionStorage.getItem('isAdmin')));

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setIsLoggedIn(flag) {
  this.loggedIn.next(flag);
  }

  get getIsAdmin() {
    return this.isAdmins.asObservable();
  }

  setIsAdmin(flag) {
  this.isAdmins.next(flag);
  }

  login(userInfo): Observable<any> {
    return this.http.post('http://192.168.43.188:3402/api/user/login', userInfo);
  }

  addProduct(productInfo): Observable<any> {
    return this.http.post('http://192.168.43.188:3402/api/addProduct', productInfo);
  }

  getProducts(): Observable<any> {
    return this.http.get('http://192.168.43.188:3402/api/getProducts');
  }
  updateProduct(productInfo): Observable<any> {
    return this.http.put('http://192.168.43.188:3402/api/updateProduct', productInfo);
  }
  logOut(){
      sessionStorage.clear();
      this.loggedIn.next(false);
      this.isAdmins.next(false);
      this.router.navigate(['/']);

  }
  addTocart(info): Observable<any> {
    return this.http.post('http://192.168.43.188:3402/api/addToCart', info);
  }

  getCartDetails(): Observable<any> {
    return this.http.get('http://192.168.43.188:3402/api/getCartDetails?'+'id='+JSON.parse(sessionStorage.getItem('user'))._id);
  }
}
