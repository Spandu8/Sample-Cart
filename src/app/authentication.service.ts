import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable , Subject , of} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Config } from '../config/config';
import { User } from '../config/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  private cartSubject = new Subject();
   CartState = this.cartSubject.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(
    JSON.parse(sessionStorage.getItem('isLoggedIn')) ? JSON.parse(sessionStorage.getItem('isLoggedIn')) : false);

  private isAdmins = new BehaviorSubject<boolean>(
    JSON.parse(sessionStorage.getItem('isAdmin')) ? JSON.parse(sessionStorage.getItem('isAdmin')) : false);

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

  login(userInfo: User): Observable<any> {
    console.log(userInfo,'userInfo')
    return this.http.post( Config.apiRoute +'/api/user/login', userInfo);
  }

  addProduct(productInfo): Observable<any> {
    return this.http.post( Config.apiRoute + '/api/addProduct', productInfo);
  }

  getProducts(): Observable<any> {
    return this.http.get( Config.apiRoute + '/api/getProducts?'+'userId='+JSON.parse(sessionStorage.getItem('user'))._id);
  }

  updateProduct(productInfo): Observable<any> {
    return this.http.put( Config.apiRoute + '/api/updateProduct', productInfo);
  }

  logOut(){
      sessionStorage.clear();
      this.loggedIn.next(false);
      this.isAdmins.next(false);
      this.router.navigate(['/']);

  }
  addTocart(info): Observable<any> {
     return Observable.create(obs=>{
      this.http.post( Config.apiRoute  + '/api/addToCart', info).subscribe((res) => {
        console.log(res,'res');
        this.cartSubject.next(info);
        obs.next(res);
        obs.complete();
      })
     });
    
  }

  getCartDetails(): Observable<any> {
    return this.http.get( Config.apiRoute + '/api/getCartDetails?'+'id='+JSON.parse(sessionStorage.getItem('user'))._id);
  }

  registerUser(user): Observable<any> {
    return this.http.post( Config.apiRoute + '/api/user/register', user);
  }

  deleteProduct(productId): Observable<any> {
    return this.http.delete(Config.apiRoute + '/api/deleteProduct?' + 'id=' + productId);
  }
}
