import { trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, HostBinding, HostListener} from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {

  public show:boolean = false;
  isFixedNavbar: any;
  @HostBinding('class.navbar-opened') navbarOpened = false;

  opened = false;

  constructor(public firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
  get userInfo(){
    if(sessionStorage.length != 0) return true;
    return false;
  }
  
}
