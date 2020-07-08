import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { Person } from '../models/fullrespons';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {



  public iAmReady:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  persons:Person[]
  person:Person
  personSubject:Subject<Person> = new Subject<Person>()
  addedPersonSubject:Subject<Person> = new Subject<Person>()
  public newPerson = this.addedPersonSubject.asObservable()

  constructor() {
    this.personSubject.pipe(delay(670))
    .subscribe(p => this.addedPersonSubject.next(p))
    this.personSubject.subscribe(data => console.log('ServicePersonsSubject next', data));
   }

  
  addPerson(name:string,id:number):Observable<boolean>{
    let isSuccess:boolean = Math.floor(Math.random() * 66) > 20 ;
    if(isSuccess){
      this.person = {name:name, id:id,sumDoct:[]}
      this.persons.push(this.person);
      this.personSubject.next(this.person)
    }

    this.iAmReady.next(isSuccess);
    this.getSum()
    return of(isSuccess).pipe(delay(1000))
}

private sumSubject:Subject<number> = new Subject<number>()
sumResult = this.sumSubject.asObservable()
getSum():void{

  let total:number = 0;
  this.persons.forEach(p => p.sumDoct.forEach(n => total +=n))
  of(total).pipe(delay(1000)).subscribe(() => this.sumSubject.next(total))

}
}
