import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialComponent } from './special/special.component';

const routes: Routes = [
  {
    path: '',
    component:EventsComponent,
    pathMatch:'full'
  }
  ,{
    path:'events' ,
    component : EventsComponent
  },
  {
    path : 'special',
    component : SpecialComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
