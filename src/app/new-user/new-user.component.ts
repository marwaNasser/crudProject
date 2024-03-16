import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(15), Validators.minLength(3), Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    phone: new FormControl(null, [Validators.pattern('^[0-9]{11}$'), Validators.required]),
    password: new FormControl(null, [Validators.pattern('^[a-z][0-9]{5,8}$'), Validators.required])
  })
  constructor(private _UserService: UserService) { }

  isAdded:boolean = false;
  err:boolean = false;
  errMessage:string='';

  addUser() {
    const user = Object.assign(this.newUserForm.value);
    this._UserService.addUser(user)
      .then(() => {
        if(this._UserService.isAdd)
        {
          this.isAdded=this._UserService.isAdd;
          this.err=false;
          this.newUserForm.reset();
        }
        else{
        this.err=true;
        this.isAdded=false;
        this.errMessage = 'User with the same email already exists.';
        }
      });
      
  }


  ngOnInit(): void {
  }

}
