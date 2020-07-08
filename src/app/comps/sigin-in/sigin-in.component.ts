import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/models/fullrespons';
import { AddPersonService } from 'src/app/services/add-person.service';

@Component({
  selector: 'app-sigin-in',
  templateUrl: './sigin-in.component.html',
  styleUrls: ['./sigin-in.component.css']
})
export class SiginInComponent implements OnInit ,OnDestroy {

  failedAdd:boolean = false

  private subscribers:Subscription[] = []
  persons:Person[] = []
  sum:number

  constructor(public mySvc:AddPersonService) { }

  addPerson(name,id){
      id = parseInt(id);
      this.mySvc.addPerson(name,id).subscribe(success => this.failedAdd = !success);
  }


  ngOnDestroy(): void {
      this.subscribers.forEach(s => s.unsubscribe())
  }

  ngOnInit(): void {
    this.subscribers.push(this.mySvc.newPerson.subscribe(p => this.persons.push(p)));
    this.subscribers.push(this.mySvc.sumResult.subscribe(r => this.sum = r));

  }

}
