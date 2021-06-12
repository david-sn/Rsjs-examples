import { Observable, forkJoin, of, EMPTY,fromEvent,interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { filter, map, catchError , concatMap,bufferTime } from 'rxjs/operators'

interface NewsFeed {
    categroy: 'Business' | 'Sprots',
    type: string
}

//-----FILTER---
let newsObserv$ = new Observable<NewsFeed>(subscrib => {
    setTimeout(() => {
        subscrib.next({ categroy: 'Sprots', type: 'A' });
    }, 200)
    setTimeout(() => {
        subscrib.next({ categroy: 'Business', type: 'B' });
    }, 200)
    setTimeout(() => {
        subscrib.next({ categroy: 'Sprots', type: 'C' });
    }, 200)
    setTimeout(() => {
        subscrib.next({ categroy: 'Business', type: 'D' });
    }, 200)
});
newsObserv$.pipe(
    filter(newsFeed=> newsFeed.categroy ==='Sprots' )
).subscribe(val=>console.log(val))


//----MAP----
const name$ = ajax.get('https://random-data-api.com/api/name/random_name');
const nation$ = ajax.get('https://random-data-api.com/api/nation/random_nation');

let pipNameObs = name$.pipe(
    map(nameResponse=> nameResponse.response.first_name)
)
let nationPipObs = nation$.pipe(
    map(nationResponse=> nationResponse.response.capital)
)

forkJoin([pipNameObs,nationPipObs]).subscribe(([name,nation])=>console.log(name,'  ',nation));

//------catchError---

const httpFail = new Observable(sub => {
    setTimeout(() => {
        sub.error('Http Faild to send');
    }, 3000);
});

httpFail.pipe(
    // catchError(err => of('Catch ERROR'+ err)
    // catchError(err => EMPTY)
    catchError(err => of(null))

).subscribe({
    next: val => console.log(val),
    error: () => console.log('MY ERROR'),
    complete: () => console.log('completed')
})


//-------concatMap---

const myObs = new Observable(sub=>{
    setTimeout(()=>sub.next('A'),2000);
    setTimeout(()=>sub.next('B'),5000);
});

myObs.pipe(
    concatMap(val=>{
        console.log('val from concat MAP',val);
        return of(val,val);
    })
).subscribe(v=>console.log(v))

//concate map
const tempInput = document.getElementById('api-id');
const btn = document.getElementById('btn-id');

let btn$ = fromEvent(btn, 'click');

btn$
  .pipe(
    map(() => tempInput.value),
    concatMap(inputTxtVal => {
      console.log('dsf', inputTxtVal);
      return ajax(
        `https://random-data-api.com/api/${inputTxtVal}/random_${inputTxtVal}`
      ).pipe(catchError(er => of('inner internal error' + er)));
    }),
    catchError(err => EMPTY)
  )
  .subscribe({
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log('complete')
  });

 

  //Create an observable that emits a value every 500ms
const source = interval(490);
//After 2 seconds have passed, emit buffered values as an array
const example = source.pipe(bufferTime(2000));
//Print values to console
//ex. output [0,1,2]...[3,4,5,6]
const subscribe = example.subscribe(val =>
  console.log('Buffered with Time:', val)
);