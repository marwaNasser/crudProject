import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<any> ;
  users: Observable<any[]> = new Observable<any[]>;
  isAdd:boolean=false;


  constructor(private _AngularFirestore: AngularFirestore) {
    this.usersCollection = this._AngularFirestore.collection('users');
  }

  addUser(user: any) {
    const usersCollectionRef = this._AngularFirestore.collection('users', ref => ref.where('email', '==', user.email));
    return usersCollectionRef.get().toPromise().then(querySnapshot => {
      if (querySnapshot && querySnapshot.size > 0) {
        throw new Error('User with the same email already exists.');
      } else {
        this.isAdd = true;
        return this._AngularFirestore.collection('users').add(user);
      }
    }).catch(error => {
      console.error('Error checking user existence:', error);
    });
  }
  getUsers() {
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
    return this.users;
  }
}
