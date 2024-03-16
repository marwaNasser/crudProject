import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData: any;
  data:boolean=false;

  constructor(private _AngularFirestore:AngularFirestore, private _AngularFireAuth:AngularFireAuth) { 
    
  }


  ngOnInit(): void {

    this._AngularFireAuth.authState.subscribe(user => {
      if (user) {
        const userEmail = user.email;
        this._AngularFirestore.collection('users', ref => ref.where('email', '==', userEmail)).get().subscribe(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.userData = doc.data();
            this.data=false;
          });
        });
      }
      else{
        this.data=true;
      }
    });
   }

}
