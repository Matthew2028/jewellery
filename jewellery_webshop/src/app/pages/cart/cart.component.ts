import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cart: any = [];
  num: any = [];
  cartNumber: string | null | undefined;
  obj: any;
  constructor(private productServices: ProductsService) {
    
  }

  ngOnInit(): void {
    this.cart = JSON.parse(sessionStorage.getItem("cart") || '[]');
    this.num = this.productServices.sum();
    this.cartNumber = this.num[this.num.length -1];
  }
  ngAfterViewInit(){
    this.productServices.total = 0;
  }
  toClear(){
    this.productServices.clear();
    window.location.reload();
    alert("Sikeres rendelés! A rendelésed hamarosan feldolgozásra kerül.")
  }

}
