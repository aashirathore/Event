import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.css']
})
export class SpecialComponent implements OnInit {
specialEvents=[];
  constructor(private _auth :EventService,private _router:Router) { }

  ngOnInit(): void {
    this._auth.getSpecialEvents().subscribe(
      res=>this.specialEvents=res,
      err=>{
        if(err instanceof HttpErrorResponse) {
          if(err.status===401) {
            this._router.navigate(['/login'])
          }
        }
      }
    )

  }

}
