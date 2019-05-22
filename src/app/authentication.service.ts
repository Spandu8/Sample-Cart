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

  private user = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('user')))

  setUserDetails(info) {
    this.user.next(info);
  }

  get getUserDetails() {
    return this.user.asObservable();
  }

  login(userInfo: User): Observable<any> {
    console.log(userInfo,'userInfo')
    return this.http.post(`${Config.apiRoute}/api/user/login`, userInfo);
  }

  addProduct(productInfo): Observable<any> {
    return this.http.post(`${Config.apiRoute}/api/addProduct`, productInfo);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${Config.apiRoute}/api/getProducts?`,
    {
      params:{
        'userId':JSON.parse(sessionStorage.getItem('user'))._id
      }
    }
    );
  }

  updateProduct(productInfo): Observable<any> {
    return this.http.put(`${Config.apiRoute}/api/updateProduct`, productInfo);
  }

  logOut(){
      sessionStorage.clear();
      this.user.next(null);
      this.router.navigate(['/']);

  }
  addTocart(info): Observable<any> {
     return Observable.create(obs=>{
      this.http.post(`${Config.apiRoute}/api/addToCart`, info).subscribe((res) => {
        this.cartSubject.next(info);
        obs.next(res);
        obs.complete();
      })
     });
    
  }

  getCartDetails(): Observable<any> {
    return this.http.get(`${Config.apiRoute}/api/getCartDetails?`,
    {
      params: {
        'id': JSON.parse(sessionStorage.getItem('user'))._id
      }
    }
    );
  }

  registerUser(user): Observable<any> {
    return this.http.post(`${Config.apiRoute}/api/user/register`, user);
  }

  deleteProduct(productId): Observable<any> {
    return this.http.delete(`${Config.apiRoute}/api/deleteProduct?`,{
      params: {
        'id': productId
      }
    } 
    );
  }
}
