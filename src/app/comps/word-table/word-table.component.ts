import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AjaxServiceService } from 'src/app/services/ajax-service.service';
import { Observable, fromEvent } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'word-table',
  templateUrl: './word-table.component.html',
  styleUrls: ['./word-table.component.css']
})
export class WordTableComponent implements OnInit {

  displayedColumns = ['wordsArrResults1', 'wordsArrResults2'];

  counter:number
  counter2:number
  choseInputObs:Observable<Event>
 
  wordsArrResults:string[] = []
  wordsArrResults2:string[] = []
  
  choseInputEl:HTMLInputElement
  choseInputEl2:HTMLInputElement

  @ViewChild('choseInput', {static:true}) choseInputRef:ElementRef
  @ViewChild('choseInput2', {static:true}) choseInputRef2:ElementRef

  constructor(public mySvc:AjaxServiceService) { }

  ngOnInit(): void {

    this.choseInputEl = this.choseInputRef.nativeElement;
    this.choseInputEl2 = this.choseInputRef2.nativeElement; 

    this.choseInputObs = fromEvent(this.choseInputEl, "input");
    this.choseInputObs.pipe(
      tap(ev => console.log('coutriesInput fired input events')),
      debounceTime(1000),
      map(ev => (ev.target as HTMLInputElement).value),
      tap(val => console.log('coutriesInput debounceTime(1200)+map')),
      distinctUntilChanged(),
      tap(val => console.log('coutriesInput distinctUntilChanged')),
    ).subscribe(val =>{

      this.wordsArrResults = this.mySvc.wordsAutoComlete(val.toString());
      console.log(this.wordsArrResults);
      
    })

    fromEvent(this.choseInputEl2, 'input' ).pipe(
      tap(ev => console.log(this.wordsArrResults2)),
      debounceTime(1000),
      map(ev => ev['target']['value']),
      distinctUntilChanged(),
      switchMap(val => this.mySvc.wordsAutoComleteObs(val)),
    ).subscribe(result => {
      this.wordsArrResults2 = result

      console.log(this.wordsArrResults2);
      
      
    })
  }






  obsRnd(): void{
    this.mySvc.getRandomNamber().subscribe(rNum => this.counter = rNum);
  }
  
  obsRndDelay(): void{
    this.mySvc.getRandomDelay().subscribe(rNum => this.counter2 = rNum);
  }

}
