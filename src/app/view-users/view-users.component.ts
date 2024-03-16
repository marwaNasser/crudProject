import { Component, OnInit ,ChangeDetectorRef , ElementRef, ViewChild  } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  term:string='';
  users : any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'column2', 'column3', 'column4'];

  @ViewChild(MatSort) sort: MatSort | null = null;

  updateUserForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(15), Validators.minLength(3), Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    phone: new FormControl(null, [Validators.pattern('^[0-9]{11}$'), Validators.required]),
    password: new FormControl(null, [Validators.pattern('^[a-z][0-9]{5,8}$'), Validators.required])
  })

  constructor(private _UserService:UserService, private _AngularFirestore:AngularFirestore , private _ChangeDetectorRef :ChangeDetectorRef , private _ElementRef :ElementRef ) { }
  isLoading:boolean=true;
  ngOnInit(): void {
    this.displayUsers();
  }
  //// display users data  //////
  displayUsers( ){
    this._UserService.getUsers().subscribe((users)=>{
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.isLoading=false;
    });
  }
///// search method //////
  search(){
    this.dataSource.filter = this.term.trim().toLowerCase();
    this.dataSource.sort = this.sort;
  }

///// delete user  /////
deleteUser(userEmail: string) {
  const usersCollectionRef = this._AngularFirestore.collection('users', ref => ref.where('email', '==', userEmail));
  usersCollectionRef.get().subscribe(querySnapshot => {
    querySnapshot.forEach(doc => {
      doc.ref.delete().then(() => {
        console.log('User deleted successfully.');
      }).catch((error) => {
        console.error('Error deleting user:', error);
      });
    });
  });
}




///////////////  update user form  ///////////


isUpdated:boolean = false;
updateErr:boolean = false;
upUser: any = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  updateUser(user: any) {
    this.upUser = { ...user };
    const element = this._ElementRef.nativeElement.querySelector('.updateForm');
    element.classList.replace('d-none' , 'd-block');
  }

  saveUpdates() {
    const collectionRef = this._AngularFirestore.collection('users', ref => ref.where('email', '==', this.upUser.email));
    collectionRef.get().toPromise()
      .then((querySnapshot) => {
        if (querySnapshot && querySnapshot.size === 1) {
          const userDoc = querySnapshot.docs[0];
          userDoc.ref.update(this.upUser)
            .then(() => {
              this.isUpdated=true;
              this.updateErr=false;
              this.updateUserForm.reset();
            })
            .catch(() => {
              this.updateErr=true;
              this.isUpdated=false;
            });
        } else {
          this.updateErr=true;
          this.isUpdated=false;
        }
      });
    }


    exit(){
      const element = this._ElementRef.nativeElement.querySelector('.updateForm');
      element.classList.replace('d-block' , 'd-none');
    }

  

}
