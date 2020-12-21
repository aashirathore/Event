import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { SpecialComponent } from './special/special.component';
import { from } from 'rxjs';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { TokenService } from './token.service';


@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    RegisterComponent,
    LoginComponent,
    SpecialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService,AuthGuard,EventService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
