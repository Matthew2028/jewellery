import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    this.router.navigate(["/home"]);
    this.firebaseService.isLoggedIn = false;
    sessionStorage.clear();
  }
}
