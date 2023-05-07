import { Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breakpoints } from 'src/app/models/breakpoints';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit, Breakpoints {
  @Input() products: any[] | undefined;
  @Input() productsQ: Observable<Product[]> | undefined;
  dekor: Observable<any[]> | undefined;
  formCreate = new FormGroup({
    newNev: new FormControl(''),
    newAr: new FormControl(''),
    newKep: new FormControl(''),
    newKat: new FormControl(''),
  })
  formUpdate= new FormGroup({
    updateId: new FormControl(''),
    updateNev: new FormControl(''),
    updateAr: new FormControl(''),
  })
  formDelete = new FormGroup({
    deleteId: new FormControl('')
  })
  mybreakpoint: number | undefined;
  public innerWidth: any;
  
  m = 880;
  s = 650;

  constructor(private productServices: ProductsService) { }

  ngOnInit(): void {
    this.productsQ = this.productServices.getProducts();
    this.showAll();
    this.innerWidth = window.innerWidth;
    this.handleSize(this);
  }
  handleSize(event:any) {
    if(this.innerWidth <= this.m && this.innerWidth > 650){
      this.mybreakpoint = 2;
    }else if(this.innerWidth <= this.s){
      this.mybreakpoint = 1;
    }else{
      this.mybreakpoint = 4;
    }
  }
  addToChart(event: { stopPropagation: () => void; }, product: { id: any; }){
    event.stopPropagation();
    this.productServices.addToChart(product);
    for (let index = 0; index < this.productServices.items.length; index++) { 
      if(this.productServices.items[index] == product){
        alert(this.productServices.items[index].nev + " sikeresen a kosába került!");
      }
    }
  }

  showAll(){
    this.productServices.getProducts().subscribe((res) => {
      this.products = res;
    })
  }
  showRing(){
    this.productServices.getRing().subscribe((res) => {
      this.products = res;
    })
  }
  showEarring(){
    this.productServices.getEarring().subscribe((res) => {
      this.products = res;
    })
  }

  showPrice(){
    this.productServices.getPrice().subscribe((res) => {
      this.products = res;
    })
  }

  async create(){
    return new Promise((resolve, reject) => 
      this.productServices.productsCollection.add({
          nev: this.formCreate.value.newNev,
          ar : this.formCreate.value.newAr,
          kep: this.formCreate.value.newKep,
          kat: this.formCreate.value.newKat
      })
      .then(res => {
          this.formCreate.reset();
      })
      .catch(e => {
          reject();
    }));
  }

  async update(){
    return new Promise((resolve, reject) => 
      this.productServices.productsCollection.doc(this.formUpdate.value.updateId!).update({
        nev: this.formUpdate.value.updateNev,
        ar: this.formUpdate.value.updateAr,
      }).then(res => {
        this.formUpdate.reset();
      }).catch(e =>{
        reject();
    }));
  }

  async delete(){
    return new Promise((resolve, reject) => 
    this.productServices.productsCollection.doc(this.formDelete.value.deleteId!).delete()
    ).then(re =>{
      this.formDelete.reset();
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

}
