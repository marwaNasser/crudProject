import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string = '';
  createAcc:boolean=false;
  isLoading:boolean=false;


  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.email , Validators.required]),
    password: new FormControl(null , [ Validators.required])
  })


  constructor(private _AuthService:AuthService) { }

  submitLoginForm()
  {
    const userData = Object.assign(this.loginForm.value);
    this._AuthService.login(userData);
    if(this._AuthService.isLoggedIn){
      this.isLoading=false;
    }
    else{
      this.isLoading=true;
    }
    this.createAcc=this._AuthService.createAcc;
    this.errorMessage=this._AuthService.errorMessage;
  }

  ngOnInit(): void {
  }
}
