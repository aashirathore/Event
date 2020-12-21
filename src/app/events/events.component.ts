import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private _auth :EventService) { }
events=[];
  ngOnInit(): void {
    this._auth.getEvents().subscribe(
      res=>this.events=res,
      err=>console.log(err)
    )

  }

}
