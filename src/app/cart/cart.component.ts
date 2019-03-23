import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartList : any = [];
  totalAmount: any;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.authService.getProducts().subscribe((response) => {
      this.getCartDetails(response);
    },(error)=> {
      console.log(error,'error')
    })
  }

  getCartDetails(productList) {
    this.authService.getCartDetails().subscribe((res) => {
      this.cartList = productList.filter(function (list) {
        return res.some(function (data) {
          return  data.productId === list._id
        });
      });
      let total = 0;
      this.cartList.forEach(val => {
        total = total + parseInt(val.amount);
        this.totalAmount = total;
      })
    });
  }
}
