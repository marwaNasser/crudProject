import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage:string='';
  createAcc:boolean=false;
  isLoggedIn:boolean = false;

  constructor( private _AngularFireAuth:AngularFireAuth ,private _Router:Router) { 
  }


  //login
  login(user:{email:string,password:string}){
    return this._AngularFireAuth.signInWithEmailAndPassword(user.email, user.password).then(()=>{
      this.isLoggedIn = true;
      this._Router.navigate(['/view-users']);
    },
    err=>{
      this.errorMessage=err.message;
      if(err.message.includes('invalid-login-credentials')){
        this.createAcc=true;
      }
    });
  }
  //sign up
  signup(user:{email:string,password:string}){
    return this._AngularFireAuth.createUserWithEmailAndPassword(user.email, user.password).then(()=>{
      this._Router.navigate(['/login']);
    },
    err=>{
      this.errorMessage=err.message;
    });
  }
  //sign out
  signOut(){
    this._AngularFireAuth.signOut().then(()=>{
      this._Router.navigate(['/login']);
    });
    this.isLoggedIn = false;
  }

  isLogedIn() {
    return this.isLoggedIn;
  }
}
