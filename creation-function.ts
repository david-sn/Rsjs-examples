

import {
    of,
    Observable,
    from,
    timer,
    forkJoin
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
/*
of('AA', 'BB', 'CC')
    .subscribe({
        next: val => console.log(val),
        complete: () => console.log('complete')
    })


myOwnOf('AA', 'BB', 'CC')
    .subscribe({
        next: val => console.log(val),
        complete: () => console.log('complete')
    })

function myOwnOf(...args: string[]): Observable<string> {
    return new Observable(subscriber => {
        for (let index = 0; index < args.length; index++) {
            const element = args[index];
            subscriber.next(element);
        }
        subscriber.complete();
    });
}


//-----------FROM--------



// from(['A', 'B', 'C']).subscribe({
//     next: val => console.log(val),
//     complete: () => console.log('complete')
// })

let promise = new Promise((resolve, reject) => {
    resolve('RESOLVED');
    // reject('ERROR');
});
from(promise).subscribe({
    next: val => console.log(val),
    complete: () => console.log('complete'),
    error: err=>console.log(err)
 })



//---------------timer---------

const ownTimer = new Observable(subscriber=>{
    setTimeout(()=>{
        subscriber.next(0);
        subscriber.complete();
    }, 2000);
})

let subscription = timer(3000).subscribe({
    next: val=>console.log(val),
    complete:()=>console.log('COMPLETE')
});

setTimeout(()=> subscription.unsubscribe(),1000)

*/


//----------forkJoin-------

const name = ajax.get('https://random-data-api.com/api/name/random_name');
const nation = ajax.get('https://random-data-api.com/api/nation/random_nation');
const food = ajax.get('https://random-data-api.com/api/food/random_food');

forkJoin([name, nation, food]).subscribe(([nameRes, nationRes, foodRes]) =>
  console.log(
    nameRes.response.first_name,
    nationRes.response.capital,
    foodRes.response.dish
  )
);
