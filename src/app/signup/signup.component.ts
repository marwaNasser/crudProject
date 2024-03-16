import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.maxLength(15) , Validators.minLength(3) , Validators.required]),
    email: new FormControl(null , [Validators.email , Validators.required]),
    phone: new FormControl(null , [Validators.pattern('^[0-9]{11}$') , Validators.required]),
    password: new FormControl(null , [Validators.required])
  })

  errorMessage:string='';

  constructor( private _AuthService:AuthService , private _UserService:UserService) { }


  
  submitSignUpForm()
  {
    const userData = Object.assign(this.registerForm.value);
    this._AuthService.signup(userData);
    this.errorMessage = this._AuthService.errorMessage;
    // add user data to data base
    this._UserService.addUser(userData)
      .then(() => {

      });
    
  }



  ngOnInit(): void {
  }

}
