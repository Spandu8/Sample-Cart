import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }


  login(userInfo): Observable<any> {
    return this.http.post('http://192.168.43.188:3402/api/user/login', userInfo);
  }

  addProduct(productInfo): Observable<any> {
    return this.http.post('http://192.168.43.188:3402/api/addProduct', productInfo);
  }

  getProducts(): Observable<any> {
    return this.http.get('http://192.168.43.188:3402/api/getProducts');

  }
}
