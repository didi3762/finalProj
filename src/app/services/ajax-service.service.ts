import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Fullrespons, Person, Words } from '../models/fullrespons';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AjaxServiceService {


  


  fullResponse: Fullrespons = new Fullrespons();
  HebWords:string[]
  englishWords:string[]
  wordsArr:Words[]
 

  parsonArrSubject:Subject<Words[]> = new Subject<Words[]>()
  personsBehaviorSubject:BehaviorSubject<Words[]> = new BehaviorSubject<Words[]>(null)
  

  constructor(private myHttp:HttpClient) { 

    this.getDb<Fullrespons>("https://raw.githubusercontent.com/didi3762/ajax/master/ajax4.json")
    .subscribe(respon => {
      this.wordsArr = respon.words;
      this.englishWords = this.wordsArr[0].englishWords
      this.parsonArrSubject.next(this.wordsArr);
      this.personsBehaviorSubject.next(this.wordsArr)
    })
 this.personsBehaviorSubject.subscribe(data => console.log('ServicePersonsSubject next', data));
}


  getDb<T>(url:string): Observable<T>{
    return this.myHttp.get<T>(url)
  }

  getRandomNamber():Observable<number>{
    let num = Math.floor(Math.random() * 66)
    return of(num).pipe(delay(1000));
  }

  getRandomDelay():Observable<number>{
    let num = Math.floor(Math.random() * 66)
    return of(num).pipe(delay(1000));
  }


  iDoNothing():void{}

  wordsAutoComlete(startWithValue:string):string[]{
    return this.englishWords.filter(w => w.toLowerCase().startsWith(startWithValue.toLowerCase()))
  }


  wordsAutoComleteObs(startWithValue:string):Observable<string[]>{

        return of(this.wordsAutoComlete(startWithValue)).pipe(delay(1000));
  }

 
}
