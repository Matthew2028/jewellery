import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  permissionLevels!:number;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, public fireServices: AngularFirestore) { }

  isLoggedIn(): string | null {
    var user = firebase.auth().currentUser;

    if (user) {
      return user.email;
    } else {
      return null;
    }
  }

  
  signUp(name: string, email: string, password: string, passwordConfirm:string) {
    if(name == "" || email == "" || password == ""){
      alert("Nem hagyhatsz üresen mezőt!")
    }
    if (password != passwordConfirm) {
      alert("Nem egyezik a kettő jelszó!")
      return;
    }
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        let user = firebase.auth().currentUser
        user?.updateProfile(
          { displayName: name }
        );
        alert("Sikeres regisztráció");
        this.router.navigate(["home"]);
        this.fireServices.collection("userdata").doc(user?.uid).set(
          {
            uid: user?.uid,
            displayName: user?.displayName,
            email: user?.email
          }
        );
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/email-already-exists":
        {
            alert("E-mail cím már foglalt!");
            break;
        }
        case "auth/invalid-password":
        {
           alert("Nem megfelelő jelszó!");
           break;
        }
           default:
        {
            alert("Email cím már foglalt, vagy nem megfelelő jelszó!");
            break;
        }
      }
    });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(["home"]);
        let user = firebase.auth().currentUser
        this.fireServices.collection("users").ref.get()
        .then(
          () => {
            if (user)
            {
              this.fireServices.collection("userdata").doc(user?.uid).set(
                {
                  uid: user?.uid,
                  displayName: user?.displayName,
                  email: user?.email
                }
              );
            }
          }
        )
      }
    ).catch(err => {
      alert(err.message);
    });
  }

  /* Sign out */
  signOut() {
  this.angularFireAuth
    .signOut().then(() => {
      this.router.navigate(["home"]);
      this.permissionLevels = 0;
    });
  }
}
