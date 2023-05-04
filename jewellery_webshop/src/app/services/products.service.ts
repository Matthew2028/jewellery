import { Injectable, Query } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

import firebase from "firebase/compat/app";
import { ShopComponent } from '../pages/shop/shop.component';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const { Storage } = Plugins;
import { Product } from '../models/product';
import { Cart } from '../models/cart';

const CART_STORAGE_KEY = "MY_CART";
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  total: number = 0;
  array: Array<any> = [];
  items: Array<Product> = [];
  cartItems: Array<Cart> = [];
  productsCollection: AngularFirestoreCollection;
  cartKey: string = "";
  cartString: string = "";
  constructor(private asf: AngularFirestore,private http: HttpClient) {
    this.productsCollection = this.asf.collection("jewelerryshop");
  }
  ngOnInit(): void {

  }
  getProducts() : Observable<any> {
    return this.productsCollection.valueChanges({idField: "id" } );
  }

  getDekor()  {
    return this.asf.collection('jewelerryshop', ref => ref.where('kategoria', '==', "dekor")).valueChanges();
  }
  getPrice()  {
    return this.asf.collection('jewelerryshop', ref => ref.where('ar', '>', 4000).orderBy('ar')).valueChanges();
  }

  addToChart(product: any) {
      this.items.push(product);
      this.cartItems.push(product);
      this.cartString = JSON.stringify(this.cartItems);
      sessionStorage.setItem("cart", this.cartString);
  }
  sum(){
    for (let index = 0; index < this.cartItems.length; index++) {
      this.total += Number(this.cartItems[index].ar);
      this.array.push(this.total);
      sessionStorage.setItem("totals", JSON.stringify(this.array))
    }
   return JSON.parse(sessionStorage.getItem("totals") || "[]");
  }

  clear(){
    this.cartItems = [];
    this.total = 0;
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("totals");
  }

  getCart() {
    return this.items;
  }

}
