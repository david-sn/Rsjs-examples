import { Observable } from 'rxjs';

const observable = new Observable(subscribe => {
    console.log('START Next');

    setTimeout(() => subscribe.next('A'), 1000);
    setTimeout(() => subscribe.next('B'), 4000);
    setTimeout(() => subscribe.next('C'), 8000);
    // subscribe.error(new Error('ERROR'));
    let count = 0;
    const intervalId = setInterval(() => {
        console.log('count: ', count);
        subscribe.next(count++);

    }, 3000);

    // subscribe.complete();
    subscribe.next('Z');

    return () => {
        console.log('TearDown');        
        clearInterval(intervalId);

    }
});


const observer = {
    next: val => console.log(val),
    error: err => console.log(err),
    complete: () => console.log('COMPLETED')
};

let subscription = observable.subscribe(observer);
setTimeout(() => {
    console.log('unsubscribe');
    subscription.unsubscribe();
}, 5000)


// let subscription2 = observable.subscribe(observer);
// observable.subscribe();

setTimeout(() => {
    // observable.subscribe({
    // next:val=>console.log('inner', val)  
    // })
}, 100)

// subscription.

