// cold observable

import { ajax } from 'rxjs/ajax';


const myAjax = ajax.get('https://random-data-api.com/api/name/random_name');

myAjax.subscribe(
    val => {
        console.log(val);
    }
)
myAjax.subscribe(
    val => {
        console.log(val);
    }
)

myAjax.subscribe(
    val => {
        console.log(val);
    }
)