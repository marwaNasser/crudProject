import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: ''  , redirectTo: 'login' , pathMatch: 'full'},
  {path: 'login' ,  component: LoginComponent},
  {path: 'view-users' , component: ViewUsersComponent, canActivate: [AuthGuardGuard]},
  {path: 'new-user' ,  component: NewUserComponent, canActivate: [AuthGuardGuard]},
  {path: 'user-profile' ,  component: UserProfileComponent, canActivate: [AuthGuardGuard]},
  {path: 'signup' , component: SignupComponent},
  {path: '**' , component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
